export class Login {
  id!: number;
  nome?: string;
  cpf?: string;
  email?: string;
  username!: string;
  password!: string;
  role!: string; /*É o tipo de usuário, ou seja, se for um usuário comum, ele possui acesso apenas 
  algumas telas, enquanto o administrador pode acessar as abas de adimistrador*/
}