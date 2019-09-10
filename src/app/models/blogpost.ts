export interface BlogPost {
    _id?: string; //    ce champ est optionnel, il pourra être vide lors de la méthode POST
    title: string;
    subtitle: string;
    image: string;
    content: string;
}
