import { useMemo, useState } from 'react'
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
  {
    code: 'YYZ',
    city: { en: 'Toronto', fr: 'Toronto' },
    airport: {
      en: 'Toronto Pearson International',
      fr: 'Toronto Pearson International',
    },
    values: { 2023: 43.8, 2024: 45.6 },
  },
  {
    code: 'YVR',
    city: { en: 'Vancouver', fr: 'Vancouver' },
    airport: {
      en: 'Vancouver International',
      fr: 'Vancouver International',
    },
    values: { 2023: 24.4, 2024: 25.3 },
  },
  {
    code: 'YUL',
    city: { en: 'Montréal', fr: 'Montréal' },
    airport: {
      en: 'Montréal–Trudeau International',
      fr: 'Montréal-Trudeau International',
    },
    values: { 2023: 20.4, 2024: 21.5 },
  },
  {
    code: 'YYC',
    city: { en: 'Calgary', fr: 'Calgary' },
    airport: {
      en: 'Calgary International',
      fr: 'Calgary International',
    },
    values: { 2023: 18.0, 2024: 18.4 },
  },
  {
    code: 'YEG',
    city: { en: 'Edmonton', fr: 'Edmonton' },
    airport: {
      en: 'Edmonton International',
      fr: 'Edmonton International',
    },
    values: { 2023: 7.2, 2024: 7.5 },
  },
  {
    code: 'YOW',
    city: { en: 'Ottawa', fr: 'Ottawa' },
    airport: {
      en: 'Ottawa Macdonald–Cartier International',
      fr: 'Ottawa Macdonald-Cartier International',
    },
    values: { 2023: 4.0, 2024: 4.5 },
  },
  {
    code: 'YWG',
    city: { en: 'Winnipeg', fr: 'Winnipeg' },
    airport: {
      en: 'Winnipeg Richardson International',
      fr: 'Winnipeg Richardson International',
    },
    values: { 2023: 3.8, 2024: 4.0 },
  },
  {
    code: 'YHZ',
    city: { en: 'Halifax', fr: 'Halifax' },
    airport: {
      en: 'Halifax Stanfield International',
      fr: 'Halifax Stanfield International',
    },
    values: { 2023: 3.5, 2024: 3.8 },
  },
]

const translations = {
  en: {
    brand: 'NorthSky',
    brandSubtitle: 'CANADA AIR INSIGHTS',
    languageButton: 'Français',
    portfolioButton: 'Back to portfolio',
    eyebrow: 'OFFICIAL CANADIAN AVIATION DATA',
    title: 'Air Travel Performance in Canada',
    subtitle:
      'Explore official indicators on departure punctuality and passenger traffic at Canada’s largest airports.',
    officialNotice:
      'Official data from Transport Canada and Statistics Canada. Reference periods vary by indicator.',
    explore: 'Explore the data',
    metric: 'Performance indicator',
    airportYear: 'Airport traffic year',
    airportCount: 'Airports displayed',
    within15: 'Departures within 15 minutes',
    within60: 'Departures within one hour',
    cancellations: 'Flight cancellation rate',
    passengerVolume: 'Average daily passenger volume',
    reset: 'Reset filters',
    nationalPassengers: 'Passengers in Canada, 2024',
    nationalGrowth: 'Growth from 2023',
    largestAirport: 'Largest Canadian airport',
    million: 'million',
    passengers: 'passengers',
    lineEyebrow: 'THREE-WEEK COMPARISON',
    lineTitle: 'How did air travel performance change in April?',
    lineDescription:
      'Compare the first three weeks of April in 2019, 2023 and 2024. Results combine Canada’s eight largest airports.',
    firstWeek: 'First week',
    secondWeek: 'Second week',
    thirdWeek: 'Third week',
    percentage: 'Percentage',
    dailyPassengers: 'Daily passengers',
    barEyebrow: 'AIRPORT TRAFFIC',
    barTitle: 'Which Canadian airports handled the most passengers?',
    barDescription:
      'Compare enplaned and deplaned revenue passengers at Canada’s largest airports.',
    trafficAxis: 'Passengers (millions)',
    sourceTitle: 'Sources and interpretation',
    sourceText:
      'Punctuality data cover the eight largest Canadian airports during three weeks of April. Airport traffic figures represent annual enplaned and deplaned revenue passengers. The two datasets measure different aspects of air transportation and should not be interpreted as a direct causal relationship.',
    sourceOne:
      'Transport Canada — Update on Canada’s Air Transportation Sector Performance, April 2024.',
    sourceTwo:
      'Transport Canada — ECATS Table A14, passenger traffic by airport, 2015–2024.',
    footer: 'SEG3525 academic project — Interactive bilingual dashboard',
    topSix: 'Top 6',
    topEight: 'Top 8',
  },

  fr: {
    brand: 'NorthSky',
    brandSubtitle: 'DONNÉES AÉRIENNES DU CANADA',
    languageButton: 'English',
    portfolioButton: 'Retour au portfolio',
    eyebrow: 'DONNÉES OFFICIELLES SUR L’AVIATION CANADIENNE',
    title: 'Performance du transport aérien au Canada',
    subtitle:
      'Explorez des indicateurs officiels sur la ponctualité des départs et le trafic de passagers dans les plus grands aéroports canadiens.',
    officialNotice:
      'Données officielles de Transports Canada et de Statistique Canada. Les périodes de référence varient selon l’indicateur.',
    explore: 'Explorer les données',
    metric: 'Indicateur de performance',
    airportYear: 'Année du trafic aéroportuaire',
    airportCount: 'Aéroports affichés',
    within15: 'Départs effectués dans les 15 minutes',
    within60: 'Départs effectués dans l’heure',
    cancellations: 'Taux d’annulation des vols',
    passengerVolume: 'Volume quotidien moyen de passagers',
    reset: 'Réinitialiser les filtres',
    nationalPassengers: 'Passagers au Canada en 2024',
    nationalGrowth: 'Croissance depuis 2023',
    largestAirport: 'Plus grand aéroport canadien',
    million: 'millions',
    passengers: 'passagers',
    lineEyebrow: 'COMPARAISON SUR TROIS SEMAINES',
    lineTitle: 'Comment la performance aérienne a-t-elle évolué en avril?',
    lineDescription:
      'Comparez les trois premières semaines d’avril en 2019, 2023 et 2024. Les résultats regroupent les huit plus grands aéroports canadiens.',
    firstWeek: 'Première semaine',
    secondWeek: 'Deuxième semaine',
    thirdWeek: 'Troisième semaine',
    percentage: 'Pourcentage',
    dailyPassengers: 'Passagers quotidiens',
    barEyebrow: 'TRAFIC AÉROPORTUAIRE',
    barTitle: 'Quels aéroports canadiens ont accueilli le plus de passagers?',
    barDescription:
      'Comparez les passagers payants embarqués et débarqués dans les principaux aéroports canadiens.',
    trafficAxis: 'Passagers (millions)',
    sourceTitle: 'Sources et interprétation',
    sourceText:
      'Les données de ponctualité portent sur les huit plus grands aéroports canadiens pendant trois semaines d’avril. Les données de trafic représentent les passagers payants embarqués et débarqués pendant une année. Les deux jeux de données mesurent des dimensions différentes et ne démontrent pas directement une relation causale.',
    sourceOne:
      'Transports Canada — Mise à jour sur la performance du secteur du transport aérien, avril 2024.',
    sourceTwo:
      'Transports Canada — Tableau ECATS A14, trafic de passagers par aéroport, 2015 à 2024.',
    footer: 'Projet universitaire SEG3525 — Tableau de bord interactif bilingue',
    topSix: 'Top 6',
    topEight: 'Top 8',
  },
}

const seriesColors = {
  2019: '#7887D8',
  2023: '#F48B5F',
  2024: '#2DB6A3',
}

function App() {
  const [language, setLanguage] = useState('en')
  const [selectedMetric, setSelectedMetric] = useState('within15')
  const [trafficYear, setTrafficYear] = useState('2024')
  const [airportCount, setAirportCount] = useState(8)

  const t = translations[language]

  const numberFormatter = new Intl.NumberFormat(
    language === 'fr' ? 'fr-CA' : 'en-CA'
  )

  const decimalFormatter = new Intl.NumberFormat(
    language === 'fr' ? 'fr-CA' : 'en-CA',
    {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }
  )

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
      borderColor: seriesColors[year],
      backgroundColor: `${seriesColors[year]}22`,
      pointBackgroundColor: seriesColors[year],
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
      borderWidth: 3,
      tension: 0.28,
    })),
  }

  const displayedAirports = useMemo(
    () =>
      [...airportTraffic]
        .sort((a, b) => b.values[trafficYear] - a.values[trafficYear])
        .slice(0, airportCount),
    [trafficYear, airportCount]
  )

  const barData = {
    labels: displayedAirports.map(
      (airport) => `${airport.city[language]} · ${airport.code}`
    ),
    datasets: [
      {
        label: `${t.passengers} — ${trafficYear}`,
        data: displayedAirports.map((airport) => airport.values[trafficYear]),
        backgroundColor: displayedAirports.map((_, index) =>
          index === 0 ? '#F48B5F' : '#2DB6A3'
        ),
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          color: '#DDE7F1',
        },
      },
      tooltip: {
        backgroundColor: '#0D1D2F',
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
      x: {
        grid: { display: false },
        ticks: { color: '#AEBFD1' },
      },
      y: {
        beginAtZero: !isPassengerMetric,
        grid: {
          color: 'rgba(174, 191, 209, 0.14)',
        },
        ticks: {
          color: '#AEBFD1',
          callback: (value) =>
            isPassengerMetric ? numberFormatter.format(value) : `${value} %`,
        },
        title: {
          display: true,
          text: isPassengerMetric ? t.dailyPassengers : t.percentage,
          color: '#DDE7F1',
          font: { weight: '600' },
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
        display: false,
      },
      tooltip: {
        backgroundColor: '#0D1D2F',
        callbacks: {
          title: (items) => {
            const airport = displayedAirports[items[0].dataIndex]
            return airport.airport[language]
          },
          label: (context) =>
            `${decimalFormatter.format(context.parsed.x)} ${t.million}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#E1E7ED',
        },
        ticks: {
          callback: (value) => `${value} M`,
        },
        title: {
          display: true,
          text: t.trafficAxis,
          color: '#40556B',
          font: { weight: '600' },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#40556B',
          font: {
            weight: '600',
          },
        },
      },
    },
  }

  function resetFilters() {
    setSelectedMetric('within15')
    setTrafficYear('2024')
    setAirportCount(8)
  }

  function toggleLanguage() {
    setLanguage((current) => {
      const next = current === 'en' ? 'fr' : 'en'
      document.documentElement.lang = next
      return next
    })
  }

  return (
    <div className="app">
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
          >
            <span>{language === 'en' ? 'FR' : 'EN'}</span>
            {t.languageButton}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="hero-description">{t.subtitle}</p>
          </div>

          <div className="route-graphic" aria-hidden="true">
            <span className="route-point start-point"></span>
            <span className="route-line"></span>
            <span className="route-plane">✈</span>
            <span className="route-point end-point"></span>
          </div>
        </section>

        <div className="synthetic-alert official-alert" role="note">
          <span className="alert-icon" aria-hidden="true">
            ✓
          </span>
          <span>{t.officialNotice}</span>
        </div>

        <section className="workspace">
          <aside className="filter-panel">
            <div className="panel-heading">
              <p className="eyebrow">{t.explore}</p>
              <span className="filter-number">01</span>
            </div>

            <div className="field">
              <label htmlFor="metric">{t.metric}</label>
              <select
                id="metric"
                value={selectedMetric}
                onChange={(event) => setSelectedMetric(event.target.value)}
              >
                <option value="within15">{t.within15}</option>
                <option value="within60">{t.within60}</option>
                <option value="cancellations">{t.cancellations}</option>
                <option value="passengerVolume">{t.passengerVolume}</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="traffic-year">{t.airportYear}</label>
              <select
                id="traffic-year"
                value={trafficYear}
                onChange={(event) => setTrafficYear(event.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="airport-count">{t.airportCount}</label>
              <select
                id="airport-count"
                value={airportCount}
                onChange={(event) =>
                  setAirportCount(Number(event.target.value))
                }
              >
                <option value="6">{t.topSix}</option>
                <option value="8">{t.topEight}</option>
              </select>
            </div>

            <button
              className="reset-button"
              type="button"
              onClick={resetFilters}
            >
              ↻ {t.reset}
            </button>
          </aside>

          <div className="main-content">
            <section className="stats-strip">
              <article>
                <span className="stat-index">01</span>
                <p>{t.nationalPassengers}</p>
                <strong>
                  156.7 <small>{t.million}</small>
                </strong>
              </article>

              <article>
                <span className="stat-index">02</span>
                <p>{t.nationalGrowth}</p>
                <strong>+4.0 %</strong>
              </article>

              <article>
                <span className="stat-index">03</span>
                <p>{t.largestAirport}</p>
                <strong>Toronto · YYZ</strong>
              </article>
            </section>

            <section className="line-section">
              <div className="section-heading light-heading">
                <div>
                  <p className="eyebrow">{t.lineEyebrow}</p>
                  <h2>{t.lineTitle}</h2>
                  <p>{t.lineDescription}</p>
                </div>
                <span className="section-number">02</span>
              </div>

              <div className="line-chart-wrapper">
                <Line data={lineData} options={lineOptions} />
              </div>

              <p className="chart-context">{metricLabels[selectedMetric]}</p>
            </section>

            <section className="bubble-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{t.barEyebrow}</p>
                  <h2>{t.barTitle}</h2>
                  <p>{t.barDescription}</p>
                </div>
                <span className="section-number">03</span>
              </div>

              <div className="official-bar-wrapper">
                <Bar data={barData} options={barOptions} />
              </div>
            </section>

            <section className="data-note">
              <span className="data-note-number">04</span>

              <div>
                <h2>{t.sourceTitle}</h2>
                <p>{t.sourceText}</p>

                <ul className="source-list">
                  <li>{t.sourceOne}</li>
                  <li>{t.sourceTwo}</li>
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