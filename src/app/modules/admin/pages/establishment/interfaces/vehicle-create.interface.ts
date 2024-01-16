import { Vehicle } from './vehicle.interface';

export interface VehicleCreate extends Vehicle {
  establishmentId: string;
}
