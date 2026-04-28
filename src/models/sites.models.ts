export interface Home{
    id: number,
    siteName: string,
    ownerName: string,
    primaryColor: string
}

export interface About{
    id: number,
    title?: string,
    content?: string,
    image?: string
}

export interface Contact{
    id: number,
    phone: string,
    email: string
}
export interface Service{
    id: number,
    name: string,
    description: string,
    price?: number,
    icon?: string,
    isActive: boolean
}

export interface SocialNetwork{
    id: number,
    name: string,
    link: string,
    icon: string,
}

export interface Review{
    id: number,
    username: string,
    content: string,
    rating: number,
    createdAt: string,
    status: string
}

export interface Hardware{
    id: number,
    name: string,
    description: string,
    price:number,
    icon: string,
    warranty: string,
    image?: string, 
}

export interface Software{
    id: number,
    name: string,
    description: string,
    price:number,
    icon: string,
    version: string,
    image?: string, 
}
