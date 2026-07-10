"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TravelDetail } from "@/components/travel/TravelDetail";
import { TravelForm } from "@/components/travel/TravelForm";
import { TravelList } from "@/components/travel/TravelList";
import {
  createTravelRecord,
  deleteTravelRecord,
  getTravelRecords,
  updateTravelRecord,
} from "@/lib/travel-service";
import type { TravelFormValues, TravelRecord } from "@/types";

export default function ViajesPage() {
  const [travels, setTravels] = useState<TravelRecord[]>(() => getTravelRecords());
  const [view, setView] = useState<"list" | "form" | "detail">("list");
  const [selectedTravel, setSelectedTravel] = useState<TravelRecord | null>(null);

  const sortedTravels = useMemo(() => {
    return [...travels].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [travels]);

  const handleCreate = () => {
    setSelectedTravel(null);
    setView("form");
  };

  const handleEdit = (travel: TravelRecord) => {
    setSelectedTravel(travel);
    setView("form");
  };

  const handleDelete = (id: string) => {
    const removed = deleteTravelRecord(id);
    if (removed) {
      setTravels(getTravelRecords());
    }
  };

  const handleView = (travel: TravelRecord) => {
    setSelectedTravel(travel);
    setView("detail");
  };

  const handleSubmit = (values: TravelFormValues) => {
    if (selectedTravel?.id) {
      const updated = updateTravelRecord(selectedTravel.id, values);
      if (updated) {
        setTravels(getTravelRecords());
      }
    } else {
      createTravelRecord(values);
      setTravels(getTravelRecords());
    }

    setView("list");
    setSelectedTravel(null);
  };

  return (
    <AppShell
      title="Gestión de viajes"
      description="Registra, edita, visualiza y controla tus viajes desde un único módulo."
    >
      <div className="space-y-6">
        {view === "list" && (
          <TravelList
            travels={sortedTravels}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}

        {view === "form" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{selectedTravel ? "Editar viaje" : "Nuevo viaje"}</p>
                <h2 className="text-2xl font-semibold text-white">{selectedTravel ? "Actualiza los datos del viaje" : "Registra un nuevo viaje"}</h2>
              </div>
            </div>
            <TravelForm
              initialValues={selectedTravel ?? undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setView("list");
                setSelectedTravel(null);
              }}
              submitLabel={selectedTravel ? "Actualizar viaje" : "Crear viaje"}
            />
          </div>
        )}

        {view === "detail" && selectedTravel && (
          <TravelDetail travel={selectedTravel} onBack={() => setView("list")} />
        )}
      </div>
    </AppShell>
  );
}
