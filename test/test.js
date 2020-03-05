const { expect } = require('chai');
const bc = require('../index');

describe('#greekToBetaCode', () => {
  it('should say hello world', () => {
    const greek = 'χαῖρε ὦ κόσμε';
    const betaCode = 'xai=re w)= ko/sme';

    expect(bc.greekToBetaCode(greek)).to.equal(betaCode);
  });

  it('should convert the first line of the Iliad', () => {
    const greek = 'μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος';
    const betaCode = 'mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os';

    expect(bc.greekToBetaCode(greek)).to.equal(betaCode);
  });

  it('should convert a longer piece of text', () => {
    const greek = 'κατέβην χθὲς εἰς Πειραιᾶ μετὰ Γλαύκωνος τοῦ Ἀρίστωνος προσευξόμενός τε τῇ θεῷ καὶ ἅμα τὴν ἑορτὴν βουλόμενος θεάσασθαι τίνα τρόπον ποιήσουσιν ἅτε νῦν πρῶτον ἄγοντες. καλὴ μὲν οὖν μοι καὶ ἡ τῶν ἐπιχωρίων πομπὴ ἔδοξεν εἶναι, οὐ μέντοι ἧττον ἐφαίνετο πρέπειν ἣν οἱ Θρᾷκες ἔπεμπον. προσευξάμενοι δὲ καὶ θεωρήσαντες ἀπῇμεν πρὸς τὸ ἄστυ. κατιδὼν οὖν πόρρωθεν ἡμᾶς οἴκαδε ὡρμημένους Πολέμαρχος ὁ Κεφάλου ἐκέλευσε δραμόντα τὸν παῖδα περιμεῖναί ἑ κελεῦσαι. καί μου ὄπισθεν ὁ παῖς λαβόμενος τοῦ ἱματίου, κελεύει ὑμᾶς, ἔφη, Πολέμαρχος περιμεῖναι. καὶ ἐγὼ μετεστράφην τε καὶ ἠρόμην ὅπου αὐτὸς εἴη. οὗτος, ἔφη, ὄπισθεν προσέρχεται· ἀλλὰ περιμένετε. ἀλλὰ περιμενοῦμεν, ἦ δ\' ὃς ὁ Γλαύκων.';
    const betaCode = 'kate/bhn xqe\\s ei)s *peiraia= meta\\ *glau/kwnos tou= *)ari/stwnos proseuco/meno/s te th=| qew=| kai\\ a(/ma th\\n e(orth\\n boulo/menos qea/sasqai ti/na tro/pon poih/sousin a(/te nu=n prw=ton a)/gontes. kalh\\ me\\n ou)=n moi kai\\ h( tw=n e)pixwri/wn pomph\\ e)/docen ei)=nai, ou) me/ntoi h(=tton e)fai/neto pre/pein h(\\n oi( *qra=|kes e)/pempon. proseuca/menoi de\\ kai\\ qewrh/santes a)ph=|men pro\\s to\\ a)/stu. katidw\\n ou)=n po/rrwqen h(ma=s oi)/kade w(rmhme/nous *pole/marxos o( *kefa/lou e)ke/leuse dramo/nta to\\n pai=da perimei=nai/ e( keleu=sai. kai/ mou o)/pisqen o( pai=s labo/menos tou= i(mati/ou, keleu/ei u(ma=s, e)/fh, *pole/marxos perimei=nai. kai\\ e)gw\\ metestra/fhn te kai\\ h)ro/mhn o(/pou au)to\\s ei)/h. ou(=tos, e)/fh, o)/pisqen prose/rxetai: a)lla\\ perime/nete. a)lla\\ perimenou=men, h)= d\' o(\\s o( *glau/kwn.';

    expect(bc.greekToBetaCode(greek)).to.equal(betaCode);
  });

  it('should convert random characters', () => {
    const greek = 'δδΔς';
    const betaCode = 'dd*ds';

    expect(bc.greekToBetaCode(greek)).to.equal(betaCode);
  });

  it('should normalize the Unicode', () => {
    const greek = 'Πολλὴ μὲν ἐν βροτοῖσι κοὐκ ἀνώνυμος θεὰ κέκλημαι Κύπρις οὐρανοῦ τ᾿ ἔσω·';
    const betaCode = '*pollh\\ me\\n e)n brotoi=si kou)k a)nw/numos qea\\ ke/klhmai *ku/pris ou)ranou= t᾿ e)/sw:';

    expect(bc.greekToBetaCode(greek)).to.equal(betaCode);
  });
});

describe('#betaCodeToGreek', () => {
  it('should say hello world', () => {
    const greek = 'χαῖρε ὦ κόσμε';
    const betaCode = 'xai=re w)= ko/sme';

    expect(bc.betaCodeToGreek(betaCode)).to.equal(greek);
  });

  it('should convert the first line of the Iliad', () => {
    const greek = 'μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος';
    const betaCode = 'mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os';

    expect(bc.betaCodeToGreek(betaCode)).to.equal(greek);
  });

  it('should convert a longer piece of text', () => {
    const greek = 'κατέβην χθὲς εἰς Πειραιᾶ μετὰ Γλαύκωνος τοῦ Ἀρίστωνος προσευξόμενός τε τῇ θεῷ καὶ ἅμα τὴν ἑορτὴν βουλόμενος θεάσασθαι τίνα τρόπον ποιήσουσιν ἅτε νῦν πρῶτον ἄγοντες. καλὴ μὲν οὖν μοι καὶ ἡ τῶν ἐπιχωρίων πομπὴ ἔδοξεν εἶναι, οὐ μέντοι ἧττον ἐφαίνετο πρέπειν ἣν οἱ Θρᾷκες ἔπεμπον. προσευξάμενοι δὲ καὶ θεωρήσαντες ἀπῇμεν πρὸς τὸ ἄστυ. κατιδὼν οὖν πόρρωθεν ἡμᾶς οἴκαδε ὡρμημένους Πολέμαρχος ὁ Κεφάλου ἐκέλευσε δραμόντα τὸν παῖδα περιμεῖναί ἑ κελεῦσαι. καί μου ὄπισθεν ὁ παῖς λαβόμενος τοῦ ἱματίου, κελεύει ὑμᾶς, ἔφη, Πολέμαρχος περιμεῖναι. καὶ ἐγὼ μετεστράφην τε καὶ ἠρόμην ὅπου αὐτὸς εἴη. οὗτος, ἔφη, ὄπισθεν προσέρχεται· ἀλλὰ περιμένετε. ἀλλὰ περιμενοῦμεν, ἦ δ\' ὃς ὁ Γλαύκων.';
    const betaCode = 'kate/bhn xqe\\s ei)s *peiraia= meta\\ *glau/kwnos tou= *)ari/stwnos proseuco/meno/s te th=| qew=| kai\\ a(/ma th\\n e(orth\\n boulo/menos qea/sasqai ti/na tro/pon poih/sousin a(/te nu=n prw=ton a)/gontes. kalh\\ me\\n ou)=n moi kai\\ h( tw=n e)pixwri/wn pomph\\ e)/docen ei)=nai, ou) me/ntoi h(=tton e)fai/neto pre/pein h(\\n oi( *qra=|kes e)/pempon. proseuca/menoi de\\ kai\\ qewrh/santes a)ph=|men pro\\s to\\ a)/stu. katidw\\n ou)=n po/rrwqen h(ma=s oi)/kade w(rmhme/nous *pole/marxos o( *kefa/lou e)ke/leuse dramo/nta to\\n pai=da perimei=nai/ e( keleu=sai. kai/ mou o)/pisqen o( pai=s labo/menos tou= i(mati/ou, keleu/ei u(ma=s, e)/fh, *pole/marxos perimei=nai. kai\\ e)gw\\ metestra/fhn te kai\\ h)ro/mhn o(/pou au)to\\s ei)/h. ou(=tos, e)/fh, o)/pisqen prose/rxetai: a)lla\\ perime/nete. a)lla\\ perimenou=men, h)= d\' o(\\s o( *glau/kwn.';

    expect(bc.betaCodeToGreek(betaCode)).to.equal(greek);
  });

  it('should convert random characters', () => {
    const greek = 'δδΔς';
    const betaCode1 = 'dd*ds';
    const betaCode2 = 'dD*Ds2';

    expect(bc.betaCodeToGreek(betaCode1)).to.equal(greek);
    expect(bc.betaCodeToGreek(betaCode2)).to.equal(greek);
  });

  it('should convert characters with different capitalization orders', () => {
    const betaCode1 = '*o(/rkos *a)/zwton *e(/llhnas *a)=pis';
    const betaCode2 = '*(/orkos *)/azwton *(/ellhnas *)=apis';
    const greek = 'Ὅρκος Ἄζωτον Ἕλληνας Ἆπις';

    expect(bc.betaCodeToGreek(betaCode1)).to.equal(greek);
    expect(bc.betaCodeToGreek(betaCode2)).to.equal(greek);
  });
});
