export class ForoModel {
    id: number;
    nombre: string;
    descripcion: string;

    constructor(id: number, nombre: string, descripcion: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    setId(id: number): void {
        this.id = id;
    }
    getId(): number {
        return this.id;
    }
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    getNombre(): string {
        return this.nombre;
    }
    setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
    getDescripcion(): string {
        return this.descripcion;
    }
}
