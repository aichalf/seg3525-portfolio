import { useEffect, useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import './App.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title
)

const performanceData = {
  within15: {
    2019: [80.8, 79.2, 79.8],
    2023: [67.1, 74.0, 74.1],
    2024: [71.5, 76.6, 76.6],
  },
  within60: {
    2019: [93.7, 93.2, 93.4],
    2023: [87.2, 91.5, 92.3],
    2024: [88.7, 92.3, 92.1],
  },
  cancellations: {
    2019: [1.3, 1.2, 1.1],
    2023: [3.0, 1.7, 1.0],
    2024: [2.7, 1.3, 1.0],
  },
  passengerVolume: {
    2019: [142620, 145042, 150894],
    2023: [138519, 139749, 140075],
    2024: [144637, 144397, 146345],
  },
}

const airportTraffic = [
  { code: 'YYZ', city: { en: 'Toronto', fr: 'Toronto' }, airport: { en: 'Toronto Pearson International', fr: 'Toronto Pearson International' }, values: { 2023: 43.8, 2024: 45.6 } },
  { code: 'YVR', city: { en: 'Vancouver', fr: 'Vancouver' }, airport: { en: 'Vancouver International', fr: 'Vancouver International' }, values: { 2023: 24.4, 2024: 25.3 } },
  { code: 'YUL', city: { en: 'Montréal', fr: 'Montréal' }, airport: { en: 'Montréal–Trudeau International', fr: 'Montréal-Trudeau International' }, values: { 2023: 20.4, 2024: 21.5 } },
  { code: 'YYC', city: { en: 'Calgary', fr: 'Calgary' }, airport: { en: 'Calgary International', fr: 'Calgary International' }, values: { 2023: 18.0, 2024: 18.4 } },
  { code: 'YEG', city: { en: 'Edmonton', fr: 'Edmonton' }, airport: { en: 'Edmonton International', fr: 'Edmonton International' }, values: { 2023: 7.2, 2024: 7.5 } },
  { code: 'YOW', city: { en: 'Ottawa', fr: 'Ottawa' }, airport: { en: 'Ottawa Macdonald–Cartier International', fr: 'Ottawa Macdonald-Cartier International' }, values: { 2023: 4.0, 2024: 4.5 } },
  { code: 'YWG', city: { en: 'Winnipeg', fr: 'Winnipeg' }, airport: { en: 'Winnipeg Richardson International', fr: 'Winnipeg Richardson International' }, values: { 2023: 3.8, 2024: 4.0 } },
  { code: 'YHZ', city: { en: 'Halifax', fr: 'Halifax' }, airport: { en: 'Halifax Stanfield International', fr: 'Halifax Stanfield International' }, values: { 2023: 3.5, 2024: 3.8 } },
]

const translations = {
  en: {
    brand: 'NorthSky',
    brandSubtitle: 'CANADA AIR INSIGHTS',
    languageButton: 'Français',
    portfolioButton: 'Back to portfolio',
    skip: 'Skip to dashboard content',
    eyebrow: 'OFFICIAL CANADIAN AVIATION DATA',
    title: 'Air Travel Performance in Canada',
    subtitle: 'Explore official indicators on departure punctuality and passenger traffic at Canada’s largest airports.',
    officialNotice: 'Official data from Transport Canada and Statistics Canada. Reference periods vary by indicator; airport totals are rounded to the nearest 0.1 million.',
    explore: 'Explore the data',
    metric: 'Performance indicator',
    metricHelp: 'Changes the three-week line chart.',
    comparisonMode: 'Airport comparison',
    comparisonHelp: 'Switch between passenger totals and growth from 2023 to 2024.',
    compareValues: '2023 vs 2024 totals',
    compareGrowth: 'Growth from 2023 to 2024',
    airportCount: 'Airports displayed',
    countHelp: 'Changes the number of airports shown.',
    within15: 'Departures within 15 minutes',
    within60: 'Departures within one hour',
    cancellations: 'Flight cancellation rate',
    passengerVolume: 'Average daily passenger volume',
    reset: 'Reset filters',
    resetDone: 'Filters reset.',
    nationalPassengers: 'Passengers in Canada, 2024',
    nationalSource: 'Source: Statistics Canada',
    nationalGrowth: 'Growth from 2023',
    largestAirport: 'Largest Canadian airport',
    million: 'million',
    passengers: 'passengers',
    lineEyebrow: 'THREE-WEEK COMPARISON',
    lineTitle: 'How did air travel performance change in April?',
    lineDescription: 'Compare the first three weeks of April in 2019, 2023 and 2024. Results combine Canada’s eight largest airports.',
    firstWeek: 'First week',
    secondWeek: 'Second week',
    thirdWeek: 'Third week',
    percentage: 'Percentage',
    dailyPassengers: 'Daily passengers',
    barEyebrow: 'AIRPORT TRAFFIC',
    barTitle: 'Which Canadian airports handled the most passengers?',
    barDescription: 'Compare 2023 and 2024 passenger totals side by side, or display each airport’s growth rate.',
    trafficAxis: 'Passengers (millions)',
    sourceTitle: 'Sources and interpretation',
    sourceText: 'The three-week performance indicators come from Transport Canada. National and airport passenger totals come from Statistics Canada Table 23-10-0253-01 and are displayed in millions, rounded to one decimal place. These datasets measure different aspects of air transportation and should not be interpreted as a direct causal relationship.',
    sourceOne: 'Transport Canada — Update on Canada’s Air Transportation Sector Performance, April 2024',
    sourceTwo: 'Statistics Canada — Table 23-10-0253-01, annual air passenger traffic at Canadian airports',
    footer: 'Designed and developed by Aicha Lfakir — Interactive bilingual dashboard',
    topSix: 'Top 6',
    topEight: 'Top 8',
    viewTable: 'View accessible data table',
    hideTable: 'Hide accessible data table',
    year: 'Year',
    value: 'Value',
    airport: 'Airport',
    lineSummary: 'Line chart comparing three weeks of April for 2019, 2023 and 2024.',
    barSummary: 'Horizontal grouped bar chart comparing Canadian airport passenger traffic in 2023 and 2024.',
  },
  fr: {
    brand: 'NorthSky',
    brandSubtitle: 'DONNÉES AÉRIENNES DU CANADA',
    languageButton: 'English',
    portfolioButton: 'Retour au portfolio',
    skip: 'Aller directement au contenu du tableau de bord',
    eyebrow: 'DONNÉES OFFICIELLES SUR L’AVIATION CANADIENNE',
    title: 'Performance du transport aérien au Canada',
    subtitle: 'Explorez des indicateurs officiels sur la ponctualité des départs et le trafic de passagers dans les plus grands aéroports canadiens.',
    officialNotice: 'Données officielles de Transports Canada et de Statistique Canada. Les périodes de référence varient selon l’indicateur; les totaux aéroportuaires sont arrondis au dixième de million.',
    explore: 'Explorer les données',
    metric: 'Indicateur de performance',
    metricHelp: 'Modifie le graphique linéaire sur trois semaines.',
    comparisonMode: 'Comparaison des aéroports',
    comparisonHelp: 'Affiche les volumes de 2023 et 2024 ou la croissance entre les deux années.',
    compareValues: 'Totaux 2023 et 2024',
    compareGrowth: 'Croissance de 2023 à 2024',
    airportCount: 'Aéroports affichés',
    countHelp: 'Modifie le nombre d’aéroports affichés.',
    within15: 'Départs dans les 15 minutes',
    within60: 'Départs dans l’heure',
    cancellations: 'Taux d’annulation des vols',
    passengerVolume: 'Volume quotidien moyen de passagers',
    reset: 'Réinitialiser les filtres',
    resetDone: 'Les filtres ont été réinitialisés.',
    nationalPassengers: 'Passagers au Canada en 2024',
    nationalSource: 'Source : Statistique Canada',
    nationalGrowth: 'Croissance depuis 2023',
    largestAirport: 'Plus grand aéroport canadien',
    million: 'millions',
    passengers: 'passagers',
    lineEyebrow: 'COMPARAISON SUR TROIS SEMAINES',
    lineTitle: 'Comment la performance aérienne a-t-elle évolué en avril?',
    lineDescription: 'Comparez les trois premières semaines d’avril en 2019, 2023 et 2024. Les résultats regroupent les huit plus grands aéroports canadiens.',
    firstWeek: 'Première semaine',
    secondWeek: 'Deuxième semaine',
    thirdWeek: 'Troisième semaine',
    percentage: 'Pourcentage',
    dailyPassengers: 'Passagers quotidiens',
    barEyebrow: 'TRAFIC AÉROPORTUAIRE',
    barTitle: 'Quels aéroports canadiens ont accueilli le plus de passagers?',
    barDescription: 'Comparez côte à côte les totaux de 2023 et 2024, ou affichez le taux de croissance de chaque aéroport.',
    trafficAxis: 'Passagers (millions)',
    sourceTitle: 'Sources et interprétation',
    sourceText: 'Les indicateurs de performance sur trois semaines proviennent de Transports Canada. Les totaux nationaux et aéroportuaires proviennent du tableau 23-10-0253-01 de Statistique Canada et sont affichés en millions, arrondis à une décimale. Ces jeux de données mesurent des dimensions différentes et ne démontrent pas directement une relation causale.',
    sourceOne: 'Transports Canada — Mise à jour sur la performance du secteur du transport aérien, avril 2024',
    sourceTwo: 'Statistique Canada — Tableau 23-10-0253-01, trafic annuel de passagers dans les aéroports canadiens',
    footer: 'Conçu et développé par Aicha Lfakir — Tableau de bord interactif bilingue',
    topSix: 'Top 6',
    topEight: 'Top 8',
    viewTable: 'Afficher le tableau de données accessible',
    hideTable: 'Masquer le tableau de données accessible',
    year: 'Année',
    value: 'Valeur',
    airport: 'Aéroport',
    lineSummary: 'Graphique linéaire comparant trois semaines d’avril pour 2019, 2023 et 2024.',
    barSummary: 'Graphique à barres horizontales groupées comparant le trafic des aéroports canadiens en 2023 et 2024.',
  },
}

const seriesStyles = {
  2019: { color: '#8EA2FF', dash: [], pointStyle: 'circle' },
  2023: { color: '#FF8A5B', dash: [10, 6], pointStyle: 'rectRot' },
  2024: { color: '#36C2B4', dash: [3, 5], pointStyle: 'triangle' },
}

function App() {
  const [language, setLanguage] = useState('en')
  const [selectedMetric, setSelectedMetric] = useState('within15')
  const [comparisonMode, setComparisonMode] = useState('values')
  const [airportCount, setAirportCount] = useState(8)
  const [statusMessage, setStatusMessage] = useState('')
  const [showLineTable, setShowLineTable] = useState(false)
  const [showBarTable, setShowBarTable] = useState(false)

  const t = translations[language]
  const locale = language === 'fr' ? 'fr-CA' : 'en-CA'

  useEffect(() => {
    document.documentElement.lang = language
    document.title =
      language === 'fr'
        ? 'NorthSky | Performance aérienne au Canada'
        : 'NorthSky | Air Travel Performance in Canada'
  }, [language])

  const numberFormatter = new Intl.NumberFormat(locale)
  const decimalFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
  const percentFormatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  const isPassengerMetric = selectedMetric === 'passengerVolume'

  const metricLabels = {
    within15: t.within15,
    within60: t.within60,
    cancellations: t.cancellations,
    passengerVolume: t.passengerVolume,
  }

  const weeks = [t.firstWeek, t.secondWeek, t.thirdWeek]

  const lineData = {
    labels: weeks,
    datasets: ['2019', '2023', '2024'].map((year) => ({
      label: year,
      data: performanceData[selectedMetric][year],
      borderColor: seriesStyles[year].color,
      backgroundColor: `${seriesStyles[year].color}22`,
      pointBackgroundColor: seriesStyles[year].color,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointStyle: seriesStyles[year].pointStyle,
      borderDash: seriesStyles[year].dash,
      borderWidth: 3,
      tension: 0.22,
    })),
  }

  const displayedAirports = useMemo(
    () =>
      [...airportTraffic]
        .sort((a, b) => b.values[2024] - a.values[2024])
        .slice(0, airportCount),
    [airportCount]
  )

  const growthValues = displayedAirports.map((airport) =>
    ((airport.values[2024] - airport.values[2023]) / airport.values[2023]) * 100
  )

  const barData =
    comparisonMode === 'growth'
      ? {
          labels: displayedAirports.map(
            (airport) => `${airport.city[language]} · ${airport.code}`
          ),
          datasets: [
            {
              label: t.compareGrowth,
              data: growthValues,
              backgroundColor: '#2DB6A3',
              borderColor: '#17324A',
              borderWidth: 1,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        }
      : {
          labels: displayedAirports.map(
            (airport) => `${airport.city[language]} · ${airport.code}`
          ),
          datasets: [
            {
              label: '2023',
              data: displayedAirports.map((airport) => airport.values[2023]),
              backgroundColor: '#8EA2FF',
              borderColor: '#17324A',
              borderWidth: 1,
              borderRadius: 8,
              borderSkipped: false,
            },
            {
              label: '2024',
              data: displayedAirports.map((airport) => airport.values[2024]),
              backgroundColor: '#F48B5F',
              borderColor: '#17324A',
              borderWidth: 1,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { usePointStyle: true, color: '#DDE7F1', padding: 18 },
      },
      tooltip: {
        backgroundColor: '#081725',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4E6478',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y
            return isPassengerMetric
              ? `${context.dataset.label}: ${numberFormatter.format(value)}`
              : `${context.dataset.label}: ${decimalFormatter.format(value)} %`
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#D7E2ED' } },
      y: {
        beginAtZero: !isPassengerMetric,
        grid: { color: 'rgba(174, 191, 209, 0.16)' },
        ticks: {
          color: '#D7E2ED',
          callback: (value) =>
            isPassengerMetric ? numberFormatter.format(value) : `${value} %`,
        },
        title: {
          display: true,
          text: isPassengerMetric ? t.dailyPassengers : t.percentage,
          color: '#FFFFFF',
          font: { weight: '700' },
        },
      },
    },
  }

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: comparisonMode === 'values',
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          color: '#243C53',
          padding: 18,
        },
      },
      tooltip: {
        backgroundColor: '#081725',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4E6478',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (items) =>
            displayedAirports[items[0].dataIndex].airport[language],
          label: (context) =>
            comparisonMode === 'growth'
              ? `${t.compareGrowth}: ${decimalFormatter.format(
                  context.parsed.x
                )} %`
              : `${context.dataset.label}: ${decimalFormatter.format(
                  context.parsed.x
                )} ${t.million}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#DDE5EC' },
        ticks: {
          color: '#314A61',
          callback: (value) =>
            comparisonMode === 'growth' ? `${value} %` : `${value} M`,
        },
        title: {
          display: true,
          text:
            comparisonMode === 'growth'
              ? t.compareGrowth
              : t.trafficAxis,
          color: '#243C53',
          font: { weight: '700' },
        },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#243C53', font: { weight: '700' } },
      },
    },
  }

  function resetFilters() {
    setSelectedMetric('within15')
    setComparisonMode('values')
    setAirportCount(8)
    setStatusMessage(t.resetDone)
  }

  function toggleLanguage() {
    setLanguage((current) => {
      const next = current === 'en' ? 'fr' : 'en'
      setStatusMessage(
        next === 'fr'
          ? 'Langue changée pour le français.'
          : 'Language changed to English.'
      )
      return next
    })
  }

  const formatMetricValue = (value) =>
    isPassengerMetric
      ? numberFormatter.format(value)
      : `${decimalFormatter.format(value)} %`

  return (
    <div className="app">
      <a className="skip-link" href="#dashboard-content">
        {t.skip}
      </a>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.brand}>
          <span className="brand-symbol" aria-hidden="true">
            <span className="plane">✈</span>
          </span>
          <span>
            <strong>{t.brand}</strong>
            <small>{t.brandSubtitle}</small>
          </span>
        </a>

        <div className="header-actions">
          <a className="portfolio-link" href="../../index.html">
            <span aria-hidden="true">←</span>
            {t.portfolioButton}
          </a>

          <button
            className="language-switch"
            type="button"
            onClick={toggleLanguage}
            aria-label={t.languageButton}
          >
            <span aria-hidden="true">{language === 'en' ? 'FR' : 'EN'}</span>
            {t.languageButton}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 id="page-title">{t.title}</h1>
            <p className="hero-description">{t.subtitle}</p>
          </div>

          <div className="route-graphic" aria-hidden="true">
            <span className="route-point start-point"></span>
            <span className="route-line"></span>
            <span className="route-plane">✈</span>
            <span className="route-point end-point"></span>
          </div>
        </section>

        <div className="official-alert" role="note">
          <span className="alert-icon" aria-hidden="true">✓</span>
          <span>{t.officialNotice}</span>
        </div>

        <section className="workspace" id="dashboard-content">
          <aside className="filter-panel" aria-labelledby="filters-title">
            <div className="panel-heading">
              <p className="eyebrow" id="filters-title">{t.explore}</p>
              <span className="filter-number" aria-hidden="true">01</span>
            </div>

            <div className="field">
              <label htmlFor="metric">{t.metric}</label>
              <p className="field-help" id="metric-help">{t.metricHelp}</p>
              <select
                id="metric"
                value={selectedMetric}
                aria-describedby="metric-help"
                onChange={(event) => {
                  setSelectedMetric(event.target.value)
                  setStatusMessage(`${t.metric}: ${metricLabels[event.target.value]}`)
                }}
              >
                <option value="within15">{t.within15}</option>
                <option value="within60">{t.within60}</option>
                <option value="cancellations">{t.cancellations}</option>
                <option value="passengerVolume">{t.passengerVolume}</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="comparison-mode">{t.comparisonMode}</label>
              <p className="field-help" id="comparison-help">{t.comparisonHelp}</p>
              <select
                id="comparison-mode"
                value={comparisonMode}
                aria-describedby="comparison-help"
                onChange={(event) => {
                  setComparisonMode(event.target.value)
                  setStatusMessage(
                    event.target.value === 'growth'
                      ? t.compareGrowth
                      : t.compareValues
                  )
                }}
              >
                <option value="values">{t.compareValues}</option>
                <option value="growth">{t.compareGrowth}</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="airport-count">{t.airportCount}</label>
              <p className="field-help" id="count-help">{t.countHelp}</p>
              <select
                id="airport-count"
                value={airportCount}
                aria-describedby="count-help"
                onChange={(event) => {
                  const count = Number(event.target.value)
                  setAirportCount(count)
                  setStatusMessage(`${t.airportCount}: ${count}`)
                }}
              >
                <option value="6">{t.topSix}</option>
                <option value="8">{t.topEight}</option>
              </select>
            </div>

            <button className="reset-button" type="button" onClick={resetFilters}>
              <span aria-hidden="true">↻</span> {t.reset}
            </button>
          </aside>

          <div className="main-content">
            <section className="stats-strip" aria-label="Key indicators">
              <article>
                <span className="stat-index" aria-hidden="true">01</span>
                <p>{t.nationalPassengers}</p>
                <strong>{decimalFormatter.format(156.7)} <small>{t.million}</small></strong>
                <small className="stat-source">{t.nationalSource}</small>
              </article>
              <article>
                <span className="stat-index" aria-hidden="true">02</span>
                <p>{t.nationalGrowth}</p>
                <strong>{percentFormatter.format(0.04)}</strong>
                <small className="stat-source">{t.nationalSource}</small>
              </article>
              <article>
                <span className="stat-index" aria-hidden="true">03</span>
                <p>{t.largestAirport}</p>
                <strong>Toronto · YYZ</strong>
                <small className="stat-source">{t.nationalSource}</small>
              </article>
            </section>

            <section className="line-section dashboard-section" aria-labelledby="line-chart-title">
              <div className="section-heading light-heading">
                <div>
                  <p className="eyebrow">{t.lineEyebrow}</p>
                  <h2 id="line-chart-title">{t.lineTitle}</h2>
                  <p>{t.lineDescription}</p>
                </div>
                <span className="section-number" aria-hidden="true">02</span>
              </div>

              <div className="line-chart-wrapper" role="img" aria-label={`${t.lineSummary} ${metricLabels[selectedMetric]}`}>
                <Line data={lineData} options={lineOptions} />
              </div>

              <p className="chart-context">{metricLabels[selectedMetric]}</p>

              <button
                className="table-toggle"
                type="button"
                aria-expanded={showLineTable}
                onClick={() => setShowLineTable((current) => !current)}
              >
                {showLineTable ? t.hideTable : t.viewTable}
              </button>

              {showLineTable && (
                <div className="table-scroll">
                  <table className="data-table data-table-dark">
                    <caption>{t.lineTitle}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{t.year}</th>
                        {weeks.map((week) => <th scope="col" key={week}>{week}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {['2019', '2023', '2024'].map((year) => (
                        <tr key={year}>
                          <th scope="row">{year}</th>
                          {performanceData[selectedMetric][year].map((value, index) => (
                            <td key={`${year}-${index}`}>{formatMetricValue(value)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="bubble-section dashboard-section" aria-labelledby="bar-chart-title">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{t.barEyebrow}</p>
                  <h2 id="bar-chart-title">{t.barTitle}</h2>
                  <p>{t.barDescription}</p>
                </div>
                <span className="section-number" aria-hidden="true">03</span>
              </div>

              <div className="official-bar-wrapper" role="img" aria-label={`${t.barSummary} ${comparisonMode === 'growth' ? t.compareGrowth : t.compareValues}.`}>
                <Bar data={barData} options={barOptions} />
              </div>

              <p className="bar-comparison-note">
                {comparisonMode === 'growth' ? t.compareGrowth : t.compareValues}
              </p>

              <button
                className="table-toggle table-toggle-light"
                type="button"
                aria-expanded={showBarTable}
                onClick={() => setShowBarTable((current) => !current)}
              >
                {showBarTable ? t.hideTable : t.viewTable}
              </button>

              {showBarTable && (
                <div className="table-scroll">
                  <table className="data-table">
                    <caption>
                      {t.barTitle} — {comparisonMode === 'growth' ? t.compareGrowth : t.compareValues}
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">{t.airport}</th>
                        {comparisonMode === 'growth' ? (
                          <th scope="col">{t.compareGrowth}</th>
                        ) : (
                          <>
                            <th scope="col">2023</th>
                            <th scope="col">2024</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {displayedAirports.map((airport) => {
                        const growth =
                          ((airport.values[2024] - airport.values[2023]) /
                            airport.values[2023]) *
                          100

                        return (
                          <tr key={airport.code}>
                            <th scope="row">{airport.airport[language]} ({airport.code})</th>
                            {comparisonMode === 'growth' ? (
                              <td>{decimalFormatter.format(growth)} %</td>
                            ) : (
                              <>
                                <td>{decimalFormatter.format(airport.values[2023])} {t.million}</td>
                                <td>{decimalFormatter.format(airport.values[2024])} {t.million}</td>
                              </>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="data-note dashboard-section" aria-labelledby="sources-title">
              <span className="data-note-number" aria-hidden="true">04</span>
              <div>
                <h2 id="sources-title">{t.sourceTitle}</h2>
                <p>{t.sourceText}</p>
                <ul className="source-list">
                  <li>
                    <a
                      href="https://tc.canada.ca/en/aviation/infographic-update-canada-s-air-transportation-sector-performance"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.sourceOne}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=2310025301"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.sourceTwo}
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer>
        <span>{t.brand}</span>
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}

export default App
