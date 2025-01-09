export interface PageProps {
    navigation: {
        navigate: (name: string, params?: Record<string, string>)=>void;
        goBack: ()=>void;
    };
    route: { 
        params: Record<string, unknown>,
    };
}
