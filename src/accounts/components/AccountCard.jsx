function AccountCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      {subtitle && (
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export default AccountCard;
    