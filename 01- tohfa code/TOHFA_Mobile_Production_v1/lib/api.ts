import Constants from "expo-constants";
const API = (Constants.expoConfig?.extra as any)?.API_BASE || "https://api.tohfa.sa";
export async function listProducts(params: Record<string,string|number> = {}){
  const qs = new URLSearchParams(params as any).toString();
  const r = await fetch(`${API}/products${qs?`?${qs}`:''}`);
  return r.json();
}
export async function getProduct(id: string){
  const r = await fetch(`${API}/products/${id}`);
  return r.json();
}
export async function getOwner(externalId: string){
  const r = await fetch(`${API}/web3/nft/${externalId}/owner`);
  return r.json();
}
export async function createCheckout(amountSar: number, metadata:any = {}){
  const r = await fetch(`${API}/payments/checkout?method=hosted`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ amountSar, metadata })
  });
  return r.json();
}
export { API };
