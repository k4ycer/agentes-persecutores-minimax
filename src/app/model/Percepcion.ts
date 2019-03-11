import { Coordenada } from './Coordenada';

export class Percepcion{
    public s1: boolean;
    public s2: boolean;
    public s3: boolean;
    public s4: boolean;
    public s5: boolean;
    public s6: boolean;
    public s7: boolean;
    public s8: boolean;

    constructor(s1: boolean, s2: boolean, s3: boolean, s4: boolean, s5: boolean, s6: boolean, s7: boolean, s8: boolean){
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
        this.s4 = s4;
        this.s5 = s5;
        this.s6 = s6;
        this.s7 = s7;
        this.s8 = s8;
    }

    public getRepresentacionEntera(): number{
        let representacionString: string;

        representacionString = 
            (this.s1 ? "1" : "0")
            + (this.s2 ? "1" : "0")
            + (this.s3 ? "1" : "0")
            + (this.s4 ? "1" : "0")
            + (this.s5 ? "1" : "0")
            + (this.s6 ? "1" : "0")
            + (this.s7 ? "1" : "0")
            + (this.s8 ? "1" : "0");
        
        return parseInt(representacionString, 2);
    }
}