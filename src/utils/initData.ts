export type User = {
    id: number;
    email: string;
    password: string;
    username: string;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

export const initializeStore = () => {
    const existingUsers = localStorage.getItem("users");
    
    if (!existingUsers) {
        const defaultUsers: User[] = [
            {
                id: 1,
                email: "admin@teashop.cz",
                password: "admin", 
                username: "Admin"
            }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    const existingProducts = localStorage.getItem("products");
    
    if (!existingProducts) {
        const defaultProducts: Product[] = [
            { id: 1, name: "Nic", price: 150, image: "sencha.jpg" },
            { id: 2, name: "Nic1", price: 120, image: "earlgrey.jpg" },
            { id: 3, name: "Nic2", price: 200, image: "oolong.jpg" }
        ];
        localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
};