interface Session<T>
{
  id: string;
  title: string;
  speaker: string;
  theme: string;
  time: string;
    track: string;
    slides: string;
  messages:{contenu:string,time:string}[]
  description: string;
    isActive: boolean;
    

  createAt: T,
 updateAt:T,
}
