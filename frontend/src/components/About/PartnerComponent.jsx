export default function PartnerComponent({ logo, name }) {
  return (
    <div className="dark:bg-dark-600 bg-light-gray rounded-xl py-16 px-8 md:px-16 flex md:flex-row flex-col items-center justify-center">
      <img src={logo} alt={name} className="w-24 " />
      <h1 className="text-3xl font-bold dark:text-white">{name}</h1>
    </div>
  );
}
