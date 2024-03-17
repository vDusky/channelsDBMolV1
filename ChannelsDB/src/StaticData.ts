
export namespace Messages{
    let MESSAGES:any = {
        "NumPositives":"Charge(+)",
        "NumNegatives":"Charge(-)",
        "MinRadius":"Radius",
        "MinFreeRadius":"Free Radius",
        /* Tooltips data */
        "tooltip-MinRadius":"Radius of sphere within channel limited by three closest atoms",
        "tooltip-MinFreeRadius":"Radius of sphere within channel limited by three closest main chain atoms in order to allow sidechain flexibility",
        "tooltip-Bottleneck":"Radius of channel bottleneck",
        "tooltip-Length": "Length of the channel",
        "tooltip-Hydropathy": "Hydropathy index of amino acid according to Kyte and Doolittle J.Mol.Biol.(1982) 157, 105-132. Range from the most hydrophilic (Arg = -4.5) to the most hydrophobic (Ile = 4.5)",
        "tooltip-Hydrophobicity": "Normalized hydrophobicity scale by Cid et al. J. Protein Engineering (1992) 5, 373-375. Range from the most hydrophilic (Glu = -1.140) to the most hydrophobic (Ile = 1.810)",
        "tooltip-Polarity": "Lining amino acid polarity by Zimmermann et al. J. Theor. Biol. (1968) 21, 170-201. Polarity ranges from nonpolar (Ala, Gly = 0) tthrough polar (e.g. Ser = 1.67) to charged (Glu = 49.90, Arg = 52.00)",
        "tooltip-Mutability": "Relative mutability index by Jones, D.T. et al. Compur. Appl. Biosci. (1992) 8(3): 275-282. Realtive mutability based on empirical substitution matrices between similar protein sequences. High for easily substitutable amino acids, e.g. polars (Ser = 117, Thr = 107, Asn = 104) or aliphatics (Ala = 100, Val = 98, Ile = 103). Low for important structural amino acids, e.g. aromatics (Trp = 25, Phe = 51, Tyr = 50) or specials (Cys = 44, Pro = 58, Gly = 50).",
        "tooltip-agl-Hydropathy": "Average of hydropathy index per each amino acid according to Kyte and Doolittle J.Mol.Biol.(1982) 157, 105-132. Range from the most hydrophilic (Arg = -4.5) to the most hydrophobic (Ile = 4.5)",
        "tooltip-agl-Hydrophobicity": "Average of normalized hydrophobicity scales by Cid et al. J. Protein Engineering (1992) 5, 373-375. Range from the most hydrophilic (Glu = -1.140) to the most hydrophobic (Ile = 1.810)",
        "tooltip-agl-Polarity": "Average of lining amino acid polarities by Zimmermann et al. J. Theor. Biol. (1968) 21, 170-201. Polarity ranges from nonpolar (Ala, Gly = 0) tthrough polar (e.g. Ser = 1.67) to charged (Glu = 49.90, Arg = 52.00)",
        "tooltip-agl-Mutability": "Average of relative mutability index by Jones, D.T. et al. Compur. Appl. Biosci. (1992) 8(3): 275-282. Realtive mutability based on empirical substitution matrices between similar protein sequences. High for easily substitutable amino acids, e.g. polars (Ser = 117, Thr = 107, Asn = 104) or aliphatics (Ala = 100, Val = 98, Ile = 103). Low for important structural amino acids, e.g. aromatics (Trp = 25, Phe = 51, Tyr = 50) or specials (Cys = 44, Pro = 58, Gly = 50)."
    };

    export function get(messageKey:string){
        return MESSAGES[messageKey];
    }
}
