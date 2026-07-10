"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { VehicleForm } from "@/components/vehicles/VehicleForm";
import { VehicleTable } from "@/components/vehicles/VehicleTable";
import {
  createVehicleRecord,
  deleteVehicleRecord,
  getVehicleRecords,
  updateVehicleRecord,
} from "@/lib/vehicle-service";
import type { Vehicle, VehicleFormValues } from "@/types/vehicle";

export default function VehiculosPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getVehicleRecords());
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return vehicles.filter((vehicle) => {
      return [vehicle.plate, vehicle.brand, vehicle.model, vehicle.status, vehicle.type]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [vehicles, searchTerm]);

  const handleCreate = () => {
    setEditingVehicle(null);
    setIsCreating(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    const removed = deleteVehicleRecord(id);
    if (removed) {
      setVehicles(getVehicleRecords());
    }
  };

  const handleSubmit = (values: VehicleFormValues) => {
    if (editingVehicle) {
      updateVehicleRecord(editingVehicle.id, values);
    } else {
      createVehicleRecord(values);
    }

    setVehicles(getVehicleRecords());
    setIsCreating(false);
    setEditingVehicle(null);
  };

  return (
    <AppShell
      title="Gestión de vehículos"
      description="Administra la flota, el estado y la disponibilidad de tus vehículos."
    >
      <div className="space-y-6">
        {isCreating ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                {editingVehicle ? "Editar vehículo" : "Nuevo vehículo"}
              </p>
              <h2 className="text-2xl font-semibold text-white">
                {editingVehicle ? "Actualiza la información del vehículo" : "Registra un nuevo vehículo"}
              </h2>
            </div>
            <VehicleForm
              initialValues={editingVehicle ?? undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsCreating(false);
                setEditingVehicle(null);
              }}
              submitLabel={editingVehicle ? "Actualizar vehículo" : "Crear vehículo"}
            />
          </div>
        ) : (
          <VehicleTable
            vehicles={filteredVehicles}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </AppShell>
  );
}
