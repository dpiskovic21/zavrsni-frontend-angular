export interface ProjektStatistika {
  korisniciSaBrojemZadataka: {
    [idKorisnika: string]: {
      naziv: string;
      brojZadataka: number;
    };
  };
  zakasnjeliRokovi: {
    [idKorisnika: string]: {
      naziv: string;
      brojZadataka: number;
    };
  };
}
