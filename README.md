# Katuvisa Kauniainen / Gatuquiz Grankulla — julkaisu ja päivittäminen

## Miten tämä on rakennettu

`index.html` on **pysyvä kuoritiedosto**. Se sisältää kaiken PWA-tekniikan
(nimi, ikonit, offline-tuki) ja avaa sisäänsä varsinaisen pelin. Peli itse on
`Katuvisa.dc.html`, joka on Claude Designin vienti sellaisenaan.

Tämä tarkoittaa, että **et koskaan muokkaa mitään käsin**.

---

## Ensimmäinen julkaisu — oma repository

Tämä on eri palvelu kuin Helsinki-peli, joten se tarvitsee **oman
repositoryn**. Älä lataa näitä tiedostoja Helsinki-pelin repoon: tiedostonimet
ovat samat (`index.html`, `Katuvisa.dc.html`, `support.js`, `map-data.js`,
`street-facts.js`) ja korvaisivat Helsinki-pelin.

1. Kirjaudu **github.com** → **+** → **New repository**
2. Nimeksi esim. `grani-katuvisa`, valitse **Public**, **Create repository**
3. **uploading an existing file** → raahaa tämän kansion **sisältö**
   (ei kansiota itseään) → **Commit changes**
4. **Settings** → **Pages** → *Source*: **Deploy from a branch** → haara
   **main**, kansio **/ (root)** → **Save**
5. Odota 1–2 minuuttia. Osoite:
   `https://KÄYTTÄJÄNIMESI.github.io/grani-katuvisa/`

## Aloitusnäytölle

- **iPhone (Safari):** jakonappi → **Lisää Koti-valikkoon**
- **Android (Chrome):** ⋮ → **Lisää aloitusnäyttöön**

Molemmat pelit voivat olla aloitusnäytöllä yhtä aikaa omina kuvakkeinaan.
Tämän kuvake on sininen (#2e3192), Helsinki-pelin oranssi.

---

## Päivittäminen — kolme askelta

1. Vie peli Claude Designista.
2. GitHubissa **Add file** → **Upload files** → raahaa viedyt tiedostot.
3. **Commit changes**. Odota minuutti ja avaa sovellus.

Älä nimeä mitään uudelleen. Samannimiset tiedostot korvaavat vanhat
automaattisesti.

`index.html`, `sw.js`, `manifest.webmanifest` ja ikonit pysyvät ennallaan —
niitä ei tarvitse viedä uudelleen koskaan.

> **Poikkeus:** jos vaihdat pelin nimeä Claude Designissa, viedyn tiedoston
> nimi muuttuu (esim. `Granin_kadut.dc.html`). Silloin muuta `index.html`:n
> `<iframe src="...">`-riviä vastaamaan uutta nimeä, tai nimeä viety tiedosto
> takaisin muotoon `Katuvisa.dc.html`.

---

## Tiedostot

| Tiedosto | Muokkaatko? |
| --- | --- |
| `Katuvisa.dc.html` | Kyllä — korvautuu jokaisella viennillä |
| `support.js` | Kyllä — tulee viennin mukana |
| `map-data.js` | Kyllä — Kauniaisten karttadata |
| `street-facts.js` | Kyllä — katufaktat suomeksi |
| `sv-facts.js` | Kyllä — katufaktat ruotsiksi |
| `index.html` | Ei koskaan |
| `sw.js` | Ei koskaan |
| `manifest.webmanifest` | Ei koskaan |
| `icon-*.png`, `apple-touch-icon.png` | Ei koskaan |

---

## Huomioita

**Ensimmäinen avaus vaatii verkkoyhteyden.** Claude Designin ajonaikainen
kirjasto hakee React-kirjaston unpkg.com-palvelusta ja ikonifontin Google
Fontsista. Service worker tallentaa molemmat välimuistiin, joten seuraavilla
kerroilla peli toimii myös offline. Jos ikonifontti ei ole vielä latautunut,
nappien tilalla näkyy hetken aikaa sanoja kuten `chevron_left` — se korjautuu
itsestään.

**Kielivalinta** (FI / SV) tallentuu selaimen muistiin, samoin ennätyspisteet.
Ne eivät synkronoidu laitteiden välillä eivätkä palaudu, jos selaimen data
tyhjennetään.

**Kartta-aineisto** on OpenStreetMapista (ODbL). Maininta näkyy kartan
vasemmassa alakulmassa — pidä se paikallaan.
