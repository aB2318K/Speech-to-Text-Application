import Link from "next/link";

export default function Home() {
  return (
    <div>
      Welcome to the Speech-To-Text Aplication. Here you can convert your spoken words to text in real time and export it.
      <br/>
      Login or Sign-Up to continue
      <br/>
      <Link href='/login'>
        <span>LogIn</span>
      </Link>
      <br/>
      <Link href='/signup'>
        <span>Create New Account</span>
      </Link>

    </div>
  );
}
