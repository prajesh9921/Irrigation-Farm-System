
import { DropletIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="py-6">
      <div className="flex items-center justify-center md:justify-start">
        <DropletIcon className="h-8 w-8 text-blue-500 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Farm Irrigation Scheduler</h1>
          <p className="text-gray-600">Configure and monitor your IoT irrigation system</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
