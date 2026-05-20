
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd

app = FastAPI(title="Tuhfa Forecasting API")

class SeriesIn(BaseModel):
    ds: List[str]
    y: List[float]
    horizon: int = 14
    model: str = "prophet"  # prophet | xgb | auto

def _linear_fallback(df: pd.DataFrame, horizon: int):
    # بسيط: انحدار خطي على الفهرس
    import numpy as np
    x = np.arange(len(df))
    y = df['y'].values
    mx, my = x.mean(), y.mean()
    num = ((x-mx)*(y-my)).sum()
    den = ((x-mx)**2).sum() or 1.0
    slope = num/den
    intercept = my - slope*mx
    last_date = pd.to_datetime(df['ds']).max()
    out = []
    for k in range(1, horizon+1):
        i = len(df)-1 + k
        d = (last_date + pd.Timedelta(days=k)).date().isoformat()
        yhat = float(intercept + slope*i)
        out.append({"ds": d, "yhat": round(yhat, 3)})
    return out

@app.post("/forecast")
def forecast(s: SeriesIn):
    df = pd.DataFrame({"ds": s.ds, "y": s.y})
    df['ds'] = pd.to_datetime(df['ds'])
    try:
        if s.model in ("prophet","auto"):
            try:
                from prophet import Prophet
                m = Prophet()
                m.fit(df.rename(columns={"ds":"ds","y":"y"}))
                future = m.make_future_dataframe(periods=s.horizon)
                fc = m.predict(future).tail(s.horizon)[['ds','yhat']]
                return {"model":"prophet","forecast":[{"ds":d.strftime("%Y-%m-%d"),"yhat":round(float(v),3)} for d,v in zip(fc['ds'], fc['yhat'])]}
            except Exception as e:
                pass
        if s.model in ("xgb","auto"):
            try:
                import numpy as np, xgboost as xgb
                # سوّ ي سلسلة supervised baseline
                y = df['y'].values.astype('float32')
                X = []
                for i in range(3, len(y)):
                    X.append(y[i-3:i])
                if not X:
                    raise RuntimeError("not enough data")
                X = np.array(X)
                y_super = y[3:]
                model = xgb.XGBRegressor(n_estimators=200, max_depth=4, learning_rate=0.05)
                model.fit(X, y_super)
                # توقع تكراري
                window = list(y[-3:])
                out = []
                last_date = pd.to_datetime(df['ds']).max()
                for k in range(1, s.horizon+1):
                    pred = float(model.predict(np.array([window], dtype='float32'))[0])
                    d = (last_date + pd.Timedelta(days=k)).date().isoformat()
                    out.append({"ds": d, "yhat": round(pred,3)})
                    window = window[1:] + [pred]
                return {"model":"xgb","forecast": out}
            except Exception as e:
                pass
        # fallback
        return {"model":"linear_fallback", "forecast": _linear_fallback(df, s.horizon)}
    except Exception as e:
        return {"error": str(e)}
