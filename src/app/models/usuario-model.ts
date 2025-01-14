export class UsuarioModel {
    id: number;
    password: string;
    username: string;
    correo: string;
    pais: string;
    rol: string;
    biografia?: string;


    constructor(id: number, password: string, username: string, correo: string,  pais: string, rol: string, biografia?: string) {
      this.id = id;
      this.password = password;
      this.username = username;
      this.correo = correo;
      this.rol = rol;
      this.pais = pais;
      this.biografia = biografia;
    }
    getId(): number {
      return this.id;
    }

    setId(id: number): void {
      this.id = id;
    }

    getPassword(): string {
      return this.password;
    }

    setPassword(password: string): void {
      this.password = password;
    }

    getUsername(): string {
      return this.username;
    }

    setUsername(username: string): void {
      this.username = username;
    }

    getCorreo(): string {
      return this.correo;
    }

    setCorreo(correo: string): void {
      this.correo = correo;
    }

    getRol(): string {
      return this.rol;
    }

    setRol(rol: string): void {
      this.rol = rol;
    }

    getPais(): string {
      return this.pais;
    }

    setPais(pais: string): void {
      this.pais = pais;
    }
  }
  