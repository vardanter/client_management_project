import { signUpAdminUser } from "@/dbscripts/users"

type Email = string
type Password = string

type ArgsType = [Email, Password]
type ParseArgsType = {
    email: Email
    password: Password
}

const parseArgs = (args: string[]) => {
    const parsedArgs: ParseArgsType = {} as ParseArgsType;
  
    args.forEach((arg: string) => {
      const parts: string[] = arg.split("=");
      const key = parts[0] as keyof ParseArgsType  
      
      parsedArgs[key] = parts[1];
      
    });
  
    return parsedArgs;
};

const args = parseArgs(process.argv.slice(2));

console.log(args);
let errorExist = false

if (!args['email']) {
  console.error("Эмейл не заполнен")
  errorExist = true
}
if (!args['password']) {
  console.error("Пароль не заполнен")
  errorExist = true
}

if (errorExist) {
  process.exit(1)
}

async function createAdmin() {
  const admin = await signUpAdminUser({email: args.email, password: args.password})
  if (!admin) {
    throw new Error("Не удалось создать админа. Обратитесь к девелоперам")
  }
  return `---Админ успешно создан---\n-----\nemail: ${args.email}\npassword: ${args.password}`
}

(async () => {
  try {
      const text = await createAdmin();
      console.log(text);
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})();