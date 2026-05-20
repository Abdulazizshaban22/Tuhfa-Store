export { auth as middleware } from "@/auth"
export const config = {
  matcher: ["/checkout", "/dashboard/:path*"]
}
