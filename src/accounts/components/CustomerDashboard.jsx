import { useContext } from "react";
import { authContext } from "../../auth/components/AuthContextAPI";

function CustomerDashboard() {
  const { user } = useContext(authContext);

  return (
    <div className="p-6">
      {/* Cards Row */}
      <div className="flex gap-6">
        {/* Account Card */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Account Details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Account No</span>
              <span className="font-medium">{user.accountNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span className="font-medium">{user.accountType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Balance</span>
              <span className="font-semibold text-green-600">
                ₹ {user.balance}
              </span>
            </div>
          </div>
        </div>

        {/* Loan Card */}
        <div className="w-64 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Loan
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Loan No</span>
              <span className="font-medium">LN-23456</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span className="font-medium">Home Loan</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Outstanding</span>
              <span className="font-semibold text-red-600">
                ₹ 4,50,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
