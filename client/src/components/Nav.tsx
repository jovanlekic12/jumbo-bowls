function Navbar() {
  return (
    <header className="flex justify-between px-16 py-8">
      <div className="flex items-center gap-2">
        <img
          src="../public/images/logo.png"
          alt=""
          className="w-15 h-15 object-cover"
        />
        <h4 className="text-3xl font-bold">Jumbo Bowls</h4>
      </div>
      <div>
        <img src="" alt="" />
        <h4 className="text-2xl">User</h4>
      </div>
    </header>
  );
}

export default Navbar;
