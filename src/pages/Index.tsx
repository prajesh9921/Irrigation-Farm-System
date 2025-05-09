
import { useState } from "react";
import IrrigationForm from "@/components/IrrigationForm";
import IrrigationSchedule from "@/components/IrrigationSchedule";
import Header from "@/components/Header";
import { IrrigationCycle } from "@/types/irrigation";

const Index = () => {
  const [schedule, setSchedule] = useState<IrrigationCycle[]>([]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <IrrigationForm setSchedule={setSchedule} />
          </div>
          
          <div className="lg:col-span-2">
            <IrrigationSchedule schedule={schedule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
