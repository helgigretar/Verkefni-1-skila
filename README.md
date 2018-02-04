# Verkefni 1

Útfæra skal Express vefþjón sem birtir yfirlit yfir greinar úr möppu á disk og möguleika á að lesa hverja grein. 

## Greinar

Gefin er mappa með fjórum greinum ásamt myndum sem þær vísa í. Hver grein hefur skilgreind lýsigögn fremst í skjali skilgreint með _frontmatter_, t.d.

```
---
title: Lorem ipsum
slug: lorem-ipsum
date: Wed Jan 17 2018 12:30:00 GMT+0000 (GMT)
image: ./img/lorem-ipsum.jpg
---
```

Finna þarf NPM einingu sem þáttar þessi gögn ásamt rest af skjali og skilar sem gögnum. `title` er titill greinar, `slug` er slóðin sem á að vera á grein (að ofan ætti greinin slóðina `/lorem-ipsum`), `date` er dagsetning greinar, `image` er mynd fyrir grein sem þarf ekki að skilgreina.

Rest af grein er skilgreind í Markdown og þarf sömuleiðis að finna NPM pakka til að þátta það.

## Greinalisti

Forsíða á vef birtir lista af öllum greinum með mynd (ef skilgreind, annars `#666` bakgrunnur), titli og dagsetningu á formi `dd.mm.yyyy`. Greinum skal raða í öfuga tímaröð, þ.a. nýjasta greinin er fyrst.

Titill síðu (`<title>`) og fyrirsögn skal vera „Greinasafnið“.

## Grein

Þegar smellt er á grein er sú grein opnuð á viðeigandi slóð (út frá `slug`) og efni hennar birt. Ef grein vísar í mynd skal hún birtast. Hægt er að nota Express static middleware til þess, ekki ætti þó að vera hægt að opna `.md` skrár.

Titill síðu (`<title>`) og fyrirsögn skal vera titill greinar.

## Útfærsla

Allar greinar skulu lesnar _asynchronously_ af disk með callbacks, promises eða async await. Ekki þarf að spá í hraða, það er í lagi að lesa af disk fyrir hverja beiðni.

Notast skal við [EJS template](https://github.com/mde/ejs) til að útbúa HTML. Útbúa skal `header.ejs` og `footer.ejs` sem önnur template nota.

Setja skal upp villumeðhöndlun fyrir almennar villur og ef beðið er um slóð sem ekki er til (404). Skilaboð skulu birt notanda um hvað gerðist („Síða fannst ekki“ – „Villa kom upp“).

`app.js` skal setja upp Express vefþjón en virkni sem les greinar og útbýr routes fyrir þær skal útfærð í `articles.js`.

Öll dependency skulu skráð í `package.json`.

`npm start` skal keyra upp vefþjón á `localhost` porti `3000`.

## Útlit

CSS skrá ásamt mynd í haus skal sækja gegnum _static_ middleware í Express úr `/public` möppu.

CSS skal vera snyrtilegt, skalanlegt og nota flexbox. Ekki þarf að fylgja nákvæmlega gefnu útliti en það skal vera frekar líkt. Um útlit gildir:

* Meginmál notar [Lora](https://fonts.google.com/specimen/Lora) leturgerð, bæði regular, italic og bold
* Fyrirsagnir nota [Roboto](https://fonts.google.com/specimen/Roboto) leturgerð, bold
* Bakgrunnslitur er `#eee` og letur `#333`. Fyrirsögn í haus er `#eee`
* Bil eru annaðhvort `15px` eða `30px`
* Grunn leturstærð er `16px`, fyrirsagnir eru `24px`, `32px` og `48px`
* Efni síðu skal miðjað og ekki breiðara en `1200px`

[Sjá fyrirmyndir](/layout/README.md)

## Git og GitHub

Verkefni þetta er sett fyrir á GitHub og almennt ætti að skila því úr einka (private) repo nemanda. Nemendur geta fengið gjaldfrjálsan aðgang að einka repos á meðan námi stendur, sjá https://education.github.com/.

Til að byrja er hægt að afrita þetta repo og bæta við á sínu eigin:

```bash
> git clone https://github.com/vefforritun/vef2-2018-v1.git
> cd vef2-2018-v1
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push
```

## Mat

* 20% – Útlit útfært með merkingarfræðilegu HTML og snyrtilegu CSS
* 10% – EJS template notuð til að útbúa útlit
* 10% – JavaScript kóði er villulaus þegar eslint er keyrt
* 20% – Útfærsla á lestri greina og lýsigagna úr markdown skjölum
* 10% – Greinalisti
* 20% – Grein með stílum og myndum
* 10% – Villumeðhöndlun

## Sett fyrir

Verkefni sett fyrir í fyrirlestri fimmtudaginn 18. janúar 2018.

## Skil

Senda skal tölvupóst til dæmatímakennara með fyrirsögn „Vefforritun 2 - Verkefni 1“ í seinasta lagi fyrir lok dags föstudaginn 2. febrúar 2018.

Póstur skal innihalda slóð á GitHub repo fyrir verkefni og dæmatímakennara skal hafa verið boðið í repo ([sjá leiðbeiningar](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/)).

## Einkunn

Sett verða fyrir sex minni verkefni þar sem fimm bestu gilda 6% hvert, samtals 30% af lokaeinkunn.

Sett verða fyrir tvö hópa verkefni þar sem hvort um sig gildir 15%, samtals 30% af lokaeinkunn.

## Myndir

* https://unsplash.com/photos/xcQWMPm9fG8
* https://unsplash.com/photos/E7RLgUjjazc
* https://unsplash.com/photos/0gkw_9fy0eQ
