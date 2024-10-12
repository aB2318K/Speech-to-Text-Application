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

         </div>
    )
}