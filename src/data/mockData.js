// === PROCUREMENT KPI DATA ===
export const kpiData = {
  // Core procurement KPIs
  onTimeDelivery: { value: 87.4, unit: '%', trend: +2.1, status: 'warning', predictive: 91.2 },
  supplierOTIF: { value: 83.6, unit: '%', trend: -1.4, status: 'warning', predictive: 86.1 },
  procurementCycleTime: { value: 18.2, unit: 'days', trend: -3.1, status: 'success', predictive: 15.8 },
  costSavings: { value: 4.72, unit: 'M USD', trend: +12.4, status: 'success', predictive: 5.8 },
  poAccuracy: { value: 96.3, unit: '%', trend: +0.8, status: 'success', predictive: 97.1 },
  supplierCount: { value: 42, unit: '', trend: +3, status: 'info', predictive: 48 },
  activeContracts: { value: 127, unit: '', trend: +8, status: 'info', predictive: 134 },
  pendingPOs: { value: 23, unit: '', trend: -5, status: 'success', predictive: 18 },
  invoiceProcessingTime: { value: 4.8, unit: 'days', trend: -1.2, status: 'success', predictive: 3.9 },
  qualityRejectionRate: { value: 3.2, unit: '%', trend: -0.6, status: 'success', predictive: 2.4 },
  inventoryTurnover: { value: 8.7, unit: 'x', trend: +0.4, status: 'success', predictive: 9.3 },
  spendCompliance: { value: 91.5, unit: '%', trend: +1.8, status: 'success', predictive: 94.0 },
  returnRate: { value: 2.1, unit: '%', trend: +0.3, status: 'warning', predictive: 1.7 },
  supplierRiskScore: { value: 32, unit: '/100', trend: -4, status: 'success', predictive: 28 },
  totalSpend: { value: 38.4, unit: 'M USD', trend: +7.2, status: 'info', predictive: 42.1 },
  categorySpend: {
    'Cathode Materials': 14.2,
    'Anode Materials': 8.7,
    'Electrolytes': 6.1,
    'Separators': 4.3,
    'Cell Casings': 3.2,
    'BMS Components': 1.9,
  }
};

// Monthly trend data (12 months)
export const monthlyTrends = [
  { month: 'Apr', otd: 84, cost: 3.1, cycle: 22, quality: 4.1, spend: 29.2, savings: 0.31 },
  { month: 'May', otd: 85, cost: 3.3, cycle: 21, quality: 3.9, spend: 31.4, savings: 0.34 },
  { month: 'Jun', otd: 83, cost: 3.2, cycle: 22, quality: 4.2, spend: 30.8, savings: 0.29 },
  { month: 'Jul', otd: 86, cost: 3.5, cycle: 20, quality: 3.7, spend: 32.1, savings: 0.38 },
  { month: 'Aug', otd: 84, cost: 3.4, cycle: 21, quality: 3.8, spend: 33.5, savings: 0.37 },
  { month: 'Sep', otd: 87, cost: 3.6, cycle: 19, quality: 3.5, spend: 34.2, savings: 0.41 },
  { month: 'Oct', otd: 85, cost: 3.7, cycle: 20, quality: 3.6, spend: 35.0, savings: 0.44 },
  { month: 'Nov', otd: 88, cost: 3.9, cycle: 18, quality: 3.3, spend: 36.1, savings: 0.48 },
  { month: 'Dec', otd: 86, cost: 4.1, cycle: 19, quality: 3.4, spend: 35.8, savings: 0.52 },
  { month: 'Jan', otd: 87, cost: 4.3, cycle: 18, quality: 3.2, spend: 37.2, savings: 0.57 },
  { month: 'Feb', otd: 88, cost: 4.5, cycle: 18, quality: 3.1, spend: 37.8, savings: 0.63 },
  { month: 'Mar', otd: 87, cost: 4.7, cycle: 18, quality: 3.2, spend: 38.4, savings: 0.71 },
  // Predictive (next 3 months)
  { month: 'Apr*', otd: 90, cost: 5.0, cycle: 17, quality: 2.8, spend: 39.5, savings: 0.78, predicted: true },
  { month: 'May*', otd: 91, cost: 5.4, cycle: 16, quality: 2.6, spend: 40.8, savings: 0.85, predicted: true },
  { month: 'Jun*', otd: 91, cost: 5.8, cycle: 16, quality: 2.4, spend: 42.1, savings: 0.91, predicted: true },
];

export const supplierPerformance = [
  { name: 'CATL Materials', category: 'Cathode', otd: 94, quality: 98, spend: 8.4, risk: 'Low', status: 'Active', contracts: 3 },
  { name: 'Umicore SA', category: 'Cathode', otd: 88, quality: 96, spend: 5.8, risk: 'Low', status: 'Active', contracts: 2 },
  { name: 'Hitachi Chem', category: 'Anode', otd: 91, quality: 97, spend: 4.7, risk: 'Low', status: 'Active', contracts: 2 },
  { name: 'ShanShan Carbon', category: 'Anode', otd: 76, quality: 89, spend: 3.9, risk: 'High', status: 'Active', contracts: 1 },
  { name: 'Solvay Electrolytes', category: 'Electrolyte', otd: 85, quality: 95, spend: 3.2, risk: 'Medium', status: 'Active', contracts: 2 },
  { name: 'Asahi Kasei', category: 'Separator', otd: 93, quality: 99, spend: 2.8, risk: 'Low', status: 'Active', contracts: 1 },
  { name: 'SKC Inc', category: 'Separator', otd: 82, quality: 93, spend: 1.6, risk: 'Medium', status: 'Review', contracts: 1 },
  { name: 'Mitsui BMS', category: 'BMS', otd: 79, quality: 91, spend: 1.9, risk: 'Medium', status: 'Active', contracts: 1 },
  { name: 'Kyushu Metals', category: 'Casing', otd: 96, quality: 98, spend: 3.2, risk: 'Low', status: 'Active', contracts: 2 },
  { name: 'LG Chem Polymers', category: 'Electrolyte', otd: 88, quality: 96, spend: 2.9, risk: 'Low', status: 'Active', contracts: 2 },
];

export const recentPOs = [
  { id: 'PO-2024-0891', vendor: 'CATL Materials', material: 'NMC Cathode Powder', qty: '12,500 kg', value: '$842K', status: 'Delivered', date: '2025-03-28' },
  { id: 'PO-2024-0892', vendor: 'Hitachi Chem', material: 'Graphite Anode', qty: '8,200 kg', value: '$381K', status: 'In Transit', date: '2025-04-01' },
  { id: 'PO-2024-0893', vendor: 'Solvay', material: 'LiPF6 Electrolyte', qty: '3,800 L', value: '$290K', status: 'GRN Pending', date: '2025-04-02' },
  { id: 'PO-2024-0894', vendor: 'ShanShan Carbon', material: 'Silicon Anode', qty: '4,100 kg', value: '$225K', status: 'Delayed', date: '2025-04-03' },
  { id: 'PO-2024-0895', vendor: 'Asahi Kasei', material: 'PE Separator', qty: '22,000 m²', value: '$178K', status: 'Processing', date: '2025-04-04' },
  { id: 'PO-2024-0896', vendor: 'Kyushu Metals', material: 'Aluminum Casing', qty: '5,000 units', value: '$195K', status: 'Approved', date: '2025-04-05' },
];

export const rfqData = [
  { id: 'RFQ-2025-041', material: 'High-Ni NMC 811', vendors: 5, responses: 3, deadline: '2025-04-15', status: 'Open', bestQuote: '$68.4/kg' },
  { id: 'RFQ-2025-042', material: 'Silicon-Graphite Composite', vendors: 4, responses: 4, deadline: '2025-04-10', status: 'Evaluating', bestQuote: '$54.2/kg' },
  { id: 'RFQ-2025-043', material: 'Ceramic-Coated Separator', vendors: 3, responses: 2, deadline: '2025-04-20', status: 'Open', bestQuote: '$8.1/m²' },
  { id: 'RFQ-2025-044', material: 'LiFSI Electrolyte Salt', vendors: 6, responses: 5, deadline: '2025-04-12', status: 'Negotiation', bestQuote: '$72.3/kg' },
];

// === REPORTS DATA ===
export const reportTemplates = [
  {
    id: 'RPT-001',
    name: 'Monthly Procurement Summary',
    description: 'Complete procurement activity, spend analysis, and supplier scorecard',
    category: 'Procurement',
    frequency: 'Monthly',
    lastRun: '2025-04-01',
    status: 'Completed',
    metrics: ['Total Spend', 'PO Count', 'Supplier OTD', 'Cost Savings'],
    telemetry: { dataPoints: 14820, runtime: '2.4s', freshness: '99.2%', coverage: '100%' }
  },
  {
    id: 'RPT-002',
    name: 'Supplier Risk Assessment',
    description: 'Vendor risk scoring, geopolitical exposure, and mitigation recommendations',
    category: 'Risk',
    frequency: 'Weekly',
    lastRun: '2025-04-04',
    status: 'Completed',
    metrics: ['Risk Score', 'Exposure %', 'Mitigation Actions', 'SLA Compliance'],
    telemetry: { dataPoints: 8240, runtime: '1.8s', freshness: '98.7%', coverage: '97%' }
  },
  {
    id: 'RPT-003',
    name: 'Quality & Returns Analysis',
    description: 'Batch-wise defect tracking, GRN quality data, and return order trends',
    category: 'Quality',
    frequency: 'Weekly',
    lastRun: '2025-04-03',
    status: 'Completed',
    metrics: ['Rejection Rate', 'Return Count', 'Defect Categories', 'Vendor Accountability'],
    telemetry: { dataPoints: 6120, runtime: '1.2s', freshness: '99.8%', coverage: '100%' }
  },
  {
    id: 'RPT-004',
    name: 'Inventory & Delivery Performance',
    description: 'Stock levels, delivery adherence, bin-tag scan accuracy, and inventory turns',
    category: 'Inventory',
    frequency: 'Daily',
    lastRun: '2025-04-05',
    status: 'Running',
    metrics: ['Stock Levels', 'Scan Accuracy', 'Days of Cover', 'Inventory Turnover'],
    telemetry: { dataPoints: 31540, runtime: '3.1s', freshness: '100%', coverage: '99%' }
  },
  {
    id: 'RPT-005',
    name: 'Contract Compliance Report',
    description: 'Active contract utilization, renewal alerts, and price deviation tracking',
    category: 'Contracts',
    frequency: 'Monthly',
    lastRun: '2025-04-01',
    status: 'Scheduled',
    metrics: ['Contract Coverage', 'Price Variance', 'Expiry Alerts', 'Utilization Rate'],
    telemetry: { dataPoints: 4890, runtime: '0.9s', freshness: '98.1%', coverage: '100%' }
  },
  {
    id: 'RPT-006',
    name: 'Spend Category Analysis',
    description: 'Category-wise spend breakdown, price trends, and benchmark vs market index',
    category: 'Finance',
    frequency: 'Monthly',
    lastRun: '2025-04-01',
    status: 'Completed',
    metrics: ['Category Spend', 'Price Trend', 'Budget Variance', 'Market Benchmark'],
    telemetry: { dataPoints: 9630, runtime: '2.1s', freshness: '99.5%', coverage: '98%' }
  },
];

export const telemetryMetrics = [
  { label: 'SAP HANA Connection', status: 'healthy', latency: '12ms', uptime: '99.97%' },
  { label: 'Data Freshness', status: 'healthy', latency: '-', uptime: '< 5min lag' },
  { label: 'AI Model Inference', status: 'healthy', latency: '180ms', uptime: '99.82%' },
  { label: 'Report Engine', status: 'healthy', latency: '2.3s avg', uptime: '99.91%' },
  { label: 'NLP Pipeline', status: 'healthy', latency: '340ms', uptime: '99.78%' },
  { label: 'Alert Engine', status: 'warning', latency: '45ms', uptime: '98.1%' },
];

// === RCA TREE DATA ===
export const rcaTree = {
  id: 'root',
  label: 'On-Time Delivery Dropped 2.3%',
  metric: 'OTD: 83.6%',
  severity: 'warning',
  expanded: true,
  children: [
    {
      id: 'c1',
      label: 'Supplier Delays (Primary Driver — 61%)',
      metric: '3 vendors impacted',
      severity: 'danger',
      expanded: false,
      children: [
        {
          id: 'c1-1',
          label: 'ShanShan Carbon: Silicon Anode Backlog',
          metric: '14 days avg delay',
          severity: 'danger',
          children: [
            { id: 'c1-1-1', label: 'Raw lithium silicide price spike (+22%)', metric: 'Market event', severity: 'warning', children: [] },
            { id: 'c1-1-2', label: 'Factory capacity constraint (86% utilization)', metric: 'Capacity alert', severity: 'danger', children: [] },
          ]
        },
        {
          id: 'c1-2',
          label: 'SKC Inc: Separator Lead Time Extended',
          metric: '+7 days vs SLA',
          severity: 'warning',
          children: [
            { id: 'c1-2-1', label: 'Customs clearance delay — South Korea', metric: 'Logistic event', severity: 'warning', children: [] },
            { id: 'c1-2-2', label: 'New export documentation requirements (Feb 2025)', metric: 'Regulatory', severity: 'info', children: [] },
          ]
        },
        {
          id: 'c1-3',
          label: 'Mitsui BMS: Order Mis-allocation',
          metric: 'Wrong warehouse routing',
          severity: 'warning',
          children: [
            { id: 'c1-3-1', label: 'Incorrect plant code in PO-0881', metric: 'Data entry error', severity: 'danger', children: [] },
          ]
        }
      ]
    },
    {
      id: 'c2',
      label: 'Internal GRN Processing Lag (23%)',
      metric: 'Avg 2.1 day lag',
      severity: 'warning',
      expanded: false,
      children: [
        {
          id: 'c2-1',
          label: 'QR Scan Failure Rate at Gate 3',
          metric: '8.4% scan failure',
          severity: 'warning',
          children: [
            { id: 'c2-1-1', label: 'Barcode damage during transit (packaging issue)', metric: '62 bins affected', severity: 'warning', children: [] },
            { id: 'c2-1-2', label: 'Scanner firmware outdated (Gate 3 device)', metric: 'Hardware', severity: 'info', children: [] },
          ]
        },
        {
          id: 'c2-2',
          label: 'Quality Inspection Staffing Gap',
          metric: '2 inspectors on leave',
          severity: 'info',
          children: [
            { id: 'c2-2-1', label: 'Unplanned absence week of Mar 18', metric: 'HR event', severity: 'info', children: [] },
          ]
        }
      ]
    },
    {
      id: 'c3',
      label: 'Logistics / Carrier Issues (16%)',
      metric: '4 shipments affected',
      severity: 'info',
      expanded: false,
      children: [
        { id: 'c3-1', label: 'Port of Nhava Sheva congestion', metric: '+5 days transit', severity: 'warning', children: [] },
        { id: 'c3-2', label: 'Truck driver shortage — Q1 2025', metric: 'Industry-wide', severity: 'info', children: [] },
      ]
    }
  ]
};

// === NLP BOT RESPONSES ===
export const botResponses = {
  'spend trend': {
    text: 'Total procurement spend has grown 31.5% YoY from $29.2M to $38.4M, driven primarily by Cathode material price increases (+22%) and expanded production volumes. March 2025 saw the highest monthly spend at $38.4M. AI forecast projects spend to reach $42.1M by June 2025 if current volume ramp continues.',
    chart: { type: 'line', data: monthlyTrends, xKey: 'month', yKey: 'spend', label: 'Monthly Spend ($M)' }
  },
  'delivery performance': {
    text: 'On-time delivery rate has improved from 84% in April 2024 to 87.4% in March 2025. The predictive model projects OTD will reach 91.2% by Q2 2025 as supplier corrective actions take effect. Key driver of improvement: CATL Materials (94% OTD) and Asahi Kasei (93% OTD). Underperformers: ShanShan Carbon (76%) and Mitsui BMS (79%).',
    chart: { type: 'line', data: monthlyTrends, xKey: 'month', yKey: 'otd', label: 'OTD %' }
  },
  'quality rejection': {
    text: 'Quality rejection rate has decreased from 4.1% in April 2024 to 3.2% in March 2025 — a 22% improvement. The primary categories of rejection are: dimensional non-conformance (38%), chemical purity (29%), and packaging damage (21%). Predictive models suggest rate will fall to 2.4% by June 2025 with current quality improvement initiatives.',
    chart: { type: 'bar', data: monthlyTrends, xKey: 'month', yKey: 'quality', label: 'Rejection Rate %' }
  },
  'cost savings': {
    text: 'Cumulative cost savings achieved through procurement initiatives stand at $4.72M YTD, up 12.4% vs prior year. Key savings drivers: long-term contract negotiation ($1.8M), supplier consolidation ($1.1M), and demand aggregation ($0.9M). AI projects $5.8M savings potential by year-end if Q2 contract renewals are executed on schedule.',
    chart: { type: 'bar', data: monthlyTrends, xKey: 'month', yKey: 'savings', label: 'Monthly Savings ($M)' }
  }
};

export const suggestedQuestions = [
  'What is our spend trend for the last 12 months?',
  'Which suppliers have the highest delivery risk this quarter?',
  'How is our quality rejection rate trending?',
  'What cost savings have we achieved YTD?',
  'Forecast procurement spend for Q2 2025',
  'Which categories have the highest price volatility?',
  'What is the current supplier risk landscape?',
  'Show me pending PO status and aging',
];
