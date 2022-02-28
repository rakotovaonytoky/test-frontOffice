export interface Signalement {
    datesignalement: any;
    description: any; 
    id: any;
    idlocalisation: {
        id: any,
        latitude: any,
        longitude: any
    };
    idmobileuser: {
        id: any,
        nom: any,
        prenom: any
    };
    idregion: {
        id: any,
        nomregion:any
    }
    idstatus: {
        id: any,
        nom: any
    };
    idtypesignalement: {
        id: any,
        nom:any,
    }
}
