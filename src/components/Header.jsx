import logo from "/logo_crypto.png";
import InstallButton from "./InstallButton";

function Header() {
  return (
    <header className="bg-zinc-900 p-4 text-gray-100 border-b border-purple-600">
      <div className="container mx-auto flex items-center gap-3">
        <h1 className="text-3xl font-bold hidden md:block">CryptoCalcX</h1>
        <img src={logo} alt="" width={40} />
        <div className="ml-auto">
          <InstallButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
