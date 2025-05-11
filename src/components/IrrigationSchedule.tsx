
import { Pagination } from "@mui/material";
import { IrrigationCycle } from "@/types/irrigation";
import ScheduleHeader from "./irrigation/ScheduleHeader";
import ScheduleFilters from "./irrigation/ScheduleFilters";
import ScheduleTable from "./irrigation/ScheduleTable";
import EmptySchedule from "./irrigation/EmptySchedule";
import useCycleSimulation from "./irrigation/useCycleSimulation";
import useScheduleFiltering from "./irrigation/useScheduleFiltering";
import styles from "./IrrigationSchedule.module.css";

interface IrrigationScheduleProps {
  schedule: IrrigationCycle[];
}

const IrrigationSchedule = ({ schedule }: IrrigationScheduleProps) => {
  // Use custom hooks for simulation and filtering
  const liveSchedule = useCycleSimulation(schedule);
  const {
    filteredSchedule,
    currentItems,
    plots,
    selectedPlot,
    setSelectedPlot,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    resetFilters
  } = useScheduleFiltering(liveSchedule);

  return (
    <div className={styles.scheduleContainer}>
      <ScheduleHeader 
        totalCount={liveSchedule.length} 
        filteredCount={filteredSchedule.length} 
      />
      
      <div className={styles.scheduleContent}>
        {liveSchedule.length > 0 ? (
          <>
            <ScheduleFilters
              selectedPlot={selectedPlot}
              setSelectedPlot={setSelectedPlot}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              plots={plots}
              resetFilters={resetFilters}
            />
            
            <ScheduleTable cycles={currentItems} />

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        ) : (
          <EmptySchedule />
        )}
      </div>
    </div>
  );
};

export default IrrigationSchedule;
