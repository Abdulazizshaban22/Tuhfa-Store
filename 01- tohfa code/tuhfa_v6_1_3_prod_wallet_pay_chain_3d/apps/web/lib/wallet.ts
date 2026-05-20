
export async function connectWallet(): Promise<string|undefined>{
  // Placeholder: use window.ethereum if available.
  if(typeof window !== 'undefined' && (window as any).ethereum){
    const [addr] = await (window as any).ethereum.request({ method:'eth_requestAccounts' });
    return addr;
  }
  alert('لا يوجد موفّر محفظة في المتصفح. فعّل Reown AppKit لاحقًا.');
  return undefined;
}
