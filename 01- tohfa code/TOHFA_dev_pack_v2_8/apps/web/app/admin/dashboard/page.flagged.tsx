// apps/web/app/admin/dashboard/page.flagged.tsx
import useFlag from '../../hooks/useFlag';
import LineMini from '../../components/charts/LineMini';

export default function PageClient({ initial }: any) {
  const newDash = useFlag('ui.new_dashboard', true);

  // client-only guard: if flag off, hint user
  if (!newDash) return <div className="p-6">لوحة جديدة معطّلة (feature flag)</div>;

  // NOTE: This is a simple example; actual data passed via props or client fetch.
  return <div className="p-6">اللوحة الجديدة مفعلة ✅</div>;
}
