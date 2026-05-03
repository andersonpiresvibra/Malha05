/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { GridOps } from './components/GridOps';
import { OperationalMesh } from './components/OperationalMesh';
import { ShiftOperatorsSection } from './components/ShiftOperatorsSection';
import { ViewState, FlightData, Vehicle, OperatorProfile } from './types';
import { MOCK_FLIGHTS, MOCK_TEAM_PROFILES } from './data/mockData';
import { MOCK_VEHICLES } from './data/mockVehicleData';
import { INITIAL_MESH_FLIGHTS, MeshFlight } from './data/operationalMesh';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function Dashboard() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeView, setActiveView] = useState<ViewState>('GRID_OPS');
  const [flights, setFlights] = useState<FlightData[]>(MOCK_FLIGHTS);
  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [operators, setOperators] = useState<OperatorProfile[]>(MOCK_TEAM_PROFILES);
  const [meshFlights, setMeshFlights] = useState<MeshFlight[]>(INITIAL_MESH_FLIGHTS);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [ltName, setLtName] = useState('');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <DashboardHeader 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        globalSearchTerm={globalSearchTerm}
        setGlobalSearchTerm={setGlobalSearchTerm}
        ltName={ltName}
        setLtName={setLtName}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar activeView={activeView} onViewChange={setActiveView} isDarkMode={isDarkMode} />
        
        <main className="flex-1 overflow-auto relative">
          <div id="subheader-portal-target" className="absolute top-0 left-0 right-0 z-[100]"></div>
          
          <div className="h-full w-full absolute top-0 left-0 pt-[64px] pb-0">
            {activeView === 'GRID_OPS' && (
              <GridOps 
                flights={flights}
                onUpdateFlights={setFlights}
                vehicles={vehicles}
                operators={operators}
                globalSearchTerm={globalSearchTerm}
                onUpdateSearch={setGlobalSearchTerm}
                meshFlights={meshFlights}
                setMeshFlights={setMeshFlights}
                ltName={ltName}
                onOpenShiftOperators={() => setActiveView('SHIFT_OPERATORS')}
              />
            )}

            {activeView === 'OPERATIONAL_MESH' && (
              <OperationalMesh 
                meshFlights={meshFlights}
                setMeshFlights={setMeshFlights}
                setFlights={setFlights}
                ltName={ltName}
                onOpenShiftOperators={() => setActiveView('SHIFT_OPERATORS')}
              />
            )}

            {activeView === 'SHIFT_OPERATORS' && (
              <div className="h-full mt-[-64px]">
                <ShiftOperatorsSection 
                  onClose={() => setActiveView('GRID_OPS')}
                  operators={operators}
                  onUpdateOperators={setOperators}
                  flights={flights}
                  onUpdateFlights={setFlights}
                />
              </div>
            )}
            
            {activeView === 'REPORTS' && (
              <div className="flex items-center justify-center p-8 text-slate-500 font-medium">
                Módulo de Relatórios em desenvolvimento...
              </div>
            )}
            
            {activeView === 'FLEET' && (
             <div className="flex items-center justify-center p-8 text-slate-500 font-medium">
                Módulo de Frota em desenvolvimento...
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
