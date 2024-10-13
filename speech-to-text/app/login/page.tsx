import Link from "next/link";

export default function LogIn() {
    return(
         <div>
            <form action="/submit" method="post">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <button type="submit">LogIn</button>
            </form>
            <span><Link href="/reset-password">Forgotten Password?</Link></span>

            <p>
              Don't have an account? <Link href="/signup">Register here</Link>
            </p>

         </div>
    )
}