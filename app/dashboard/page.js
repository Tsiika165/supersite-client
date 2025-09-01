"use client";

import { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// South African provinces
const provinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];

// Periods
const periods = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "This Quarter",
  "Last Quarter",
  "This Year",
  "Last Year",
  "Year to Date",
  "Custom Range",
];

const COLORS = ["#863E98", "#e74c3c", "#f39c12", "#2ecc71", "#3498db"];

export default function Dashboard() {
  const dashboardRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Active tab state
  const [activeTab, setActiveTab] = useState("agent");
  //mock data for sales
  const mySales = [
    {
      customer: "Alice Smith",
      date: "2025-01-05",
      amount: "R 1,200",
      commission: "R 60",
      status: "Paid",
    },
    {
      customer: "Bob Johnson",
      date: "2025-01-12",
      amount: "R 2,500",
      commission: "R 125",
      status: "Pending",
    },
    {
      customer: "Carol White",
      date: "2025-02-01",
      amount: "R 900",
      commission: "R 45",
      status: "Paid",
    },
    {
      customer: "David Brown",
      date: "2025-02-10",
      amount: "R 3,400",
      commission: "R 170",
      status: "Paid",
    },
  ];
  const agentSalesHistory = [
    { month: "Jan", sales: 4 },
    { month: "Feb", sales: 2 },
    { month: "Mar", sales: 3 },
    { month: "Apr", sales: 5 },
  ];
  const commissionBreakdown = [
    { type: "Paid", value: 295 },
    { type: "Pending", value: 125 },
  ];
  // Filters
  const [province, setProvince] = useState("");
  const [period, setPeriod] = useState("");
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");

  // Data loaded state
  const [dataLoaded, setDataLoaded] = useState(false);

  // Dynamic filters (from DB later)
  const [teams, setTeams] = useState([]);
  const [leaders, setLeaders] = useState([]);

  // Data
  const [metrics, setMetrics] = useState({
    totalSales: "R 0",
    totalCommission: "R 0",
    activeAgents: 0,
    completedSales: 0,
  });

  const [teamPerformance, setTeamPerformance] = useState([]);
  const [provinceDistribution, setProvinceDistribution] = useState([]);
  const [agents, setAgents] = useState([]);

  // Team data
  const [teamMetrics, setTeamMetrics] = useState({
    activeTeams: 0,
    leaderCommission: "R 0",
    targetAchievement: "0%",
    teamSales: 0,
  });

  const [teamLeaders, setTeamLeaders] = useState([]);
  const [commissionDistribution, setCommissionDistribution] = useState([]);

  // Load dummy teams/leaders
  useEffect(() => {
    setTeams(["Team Alpha", "Team Beta", "Team Gamma"]);
    setLeaders(["Alice Brown", "David Wilson", "Lisa Martinez"]);
  }, []);
  //add sales modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if all required filters are selected
  const canLoadData = () => {
    if (activeTab === "agent") {
      return province && period && team;
    } else {
      return leader && period;
    }
  };

  // Apply Filters (dummy for now)
  const applyFilters = () => {
    if (!canLoadData()) {
      alert("Please select all filters first");
      return;
    }

    setDataLoaded(true);

    setMetrics({
      totalSales: "R 8.5M",
      totalCommission: "R 645K",
      activeAgents: 287,
      completedSales: 234,
    });

    setTeamPerformance([
      { name: "Alpha", value: 90 },
      { name: "Beta", value: 75 },
      { name: "Gamma", value: 60 },
    ]);

    setProvinceDistribution([
      { name: "Gauteng", value: 35 },
      { name: "Western Cape", value: 25 },
      { name: "KwaZulu-Natal", value: 20 },
      { name: "Eastern Cape", value: 10 },
      { name: "Other", value: 10 },
    ]);

    setAgents([
      {
        name: "Sarah Johnson",
        team: "Team Alpha",
        salesCount: 23,
        salesValue: "R 450,000",
        commission: "R 22,500",
        status: "Paid",
      },
      {
        name: "James Smith",
        team: "Team Beta",
        salesCount: 16,
        salesValue: "R 320,000",
        commission: "R 16,000",
        status: "Pending",
      },
      {
        name: "Michael Brown",
        team: "Team Gamma",
        salesCount: 19,
        salesValue: "R 380,000",
        commission: "R 19,000",
        status: "Processing",
      },
      {
        name: "Emily Wilson",
        team: "Team Alpha",
        salesCount: 27,
        salesValue: "R 520,000",
        commission: "R 26,000",
        status: "Paid",
      },
      {
        name: "David Lee",
        team: "Team Beta",
        salesCount: 14,
        salesValue: "R 290,000",
        commission: "R 14,500",
        status: "Pending",
      },
    ]);

    setTeamMetrics({
      activeTeams: 9,
      leaderCommission: "R 285,600",
      targetAchievement: "98%",
      teamSales: 642,
    });

    setTeamLeaders([
      {
        name: "Alice Brown",
        teamName: "Team Alpha",
        teamSize: "12 agents",
        teamSales: "R 890,000",
        leaderCommission: "R 35,600",
        ranking: "🥇 #1",
      },
      {
        name: "David Wilson",
        teamName: "Team Beta",
        teamSize: "9 agents",
        teamSales: "R 710,000",
        leaderCommission: "R 28,400",
        ranking: "🥈 #2",
      },
      {
        name: "Lisa Martinez",
        teamName: "Team Gamma",
        teamSize: "11 agents",
        teamSales: "R 685,000",
        leaderCommission: "R 27,400",
        ranking: "🥉 #3",
      },
    ]);

    setCommissionDistribution([
      { name: "Leader Bonus", value: 35 },
      { name: "Team Bonus", value: 30 },
      { name: "Individual", value: 25 },
      { name: "Performance", value: 10 },
    ]);
  };

  // Convert chart to image
  const chartToImage = async (chartRef, backgroundColor = "#ffffff") => {
    if (!chartRef.current) return null;

    const canvas = await html2canvas(chartRef.current, {
      backgroundColor,
      scale: 2,
    });
    return canvas.toDataURL("image/png");
  };

  // Download report as PDF
  const downloadPDF = async () => {
    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;

    // Add logo (placeholder)
    pdf.setFillColor(60, 50, 100);
    pdf.rect(margin, 10, 30, 10, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text("COMPANY", margin + 5, 16);

    // Add header
    pdf.setFontSize(16);
    pdf.setTextColor(60, 50, 100);
    pdf.text(
      `${activeTab === "agent" ? "AGENT" : "TEAM"} PERFORMANCE REPORT`,
      pageWidth / 2,
      20,
      { align: "center" }
    );

    // Add date
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth - margin,
      15,
      { align: "right" }
    );

    let yPosition = 30;

    // Add filters section
    pdf.setFontSize(12);
    pdf.setTextColor(60, 50, 100);
    pdf.text("FILTERS APPLIED:", margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);

    if (activeTab === "agent") {
      pdf.text(`Province: ${province || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Period: ${period || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Team: ${team || "All"}`, margin, yPosition);
    } else {
      pdf.text(`Leader: ${leader || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Period: ${period || "All"}`, margin, yPosition);
    }

    yPosition += 10;

    // Add metrics section
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    pdf.setFontSize(12);
    pdf.setTextColor(60, 50, 100);
    pdf.text("KEY METRICS:", margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);

    if (activeTab === "agent") {
      pdf.text(`Total Sales: ${metrics.totalSales}`, margin, yPosition);
      yPosition += 5;
      pdf.text(
        `Total Commission: ${metrics.totalCommission}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(`Active Agents: ${metrics.activeAgents}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Completed Sales: ${metrics.completedSales}`, margin, yPosition);
    } else {
      pdf.text(`Active Teams: ${teamMetrics.activeTeams}`, margin, yPosition);
      yPosition += 5;
      pdf.text(
        `Leader Commission: ${teamMetrics.leaderCommission}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Target Achievement: ${teamMetrics.targetAchievement}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(`Team Sales: ${teamMetrics.teamSales}`, margin, yPosition);
    }

    yPosition += 10;

    // Convert charts to images
    const barChartImg = await chartToImage(barChartRef);
    const pieChartImg = await chartToImage(pieChartRef);

    // Add charts section
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    pdf.setFontSize(12);
    pdf.setTextColor(60, 50, 100);
    pdf.text("PERFORMANCE CHARTS:", margin, yPosition);
    yPosition += 10;

    // Add bar chart
    if (barChartImg) {
      pdf.addImage(
        barChartImg,
        "PNG",
        margin,
        yPosition,
        contentWidth / 2 - 5,
        80
      );
    }

    // Add pie chart
    if (pieChartImg) {
      pdf.addImage(
        pieChartImg,
        "PNG",
        margin + contentWidth / 2 + 5,
        yPosition,
        contentWidth / 2 - 5,
        80
      );
    }

    yPosition += 90;

    // Check if we need a new page
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }

    // Add table section
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    pdf.setFontSize(12);
    pdf.setTextColor(60, 50, 100);
    pdf.text(
      `${activeTab === "agent" ? "AGENT" : "TEAM LEADER"} PERFORMANCE DATA:`,
      margin,
      yPosition
    );
    yPosition += 10;

    // Add table headers
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPosition, contentWidth, 8, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);

    let colWidths, headers;

    if (activeTab === "agent") {
      colWidths = [40, 40, 25, 30, 30, 25];
      headers = [
        "Agent",
        "Team",
        "Sales Count",
        "Sales Value",
        "Commission",
        "Status",
      ];
    } else {
      colWidths = [40, 40, 25, 30, 30, 25];
      headers = [
        "Leader",
        "Team",
        "Team Size",
        "Team Sales",
        "Commission",
        "Ranking",
      ];
    }

    let xPosition = margin;
    headers.forEach((header, i) => {
      pdf.text(header, xPosition + 2, yPosition + 5);
      xPosition += colWidths[i];
    });

    yPosition += 8;

    // Add table rows
    pdf.setFontSize(9);
    const data = activeTab === "agent" ? agents : teamLeaders;

    data.forEach((item, index) => {
      // Check if we need a new page
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = margin;

        // Add table headers again
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, yPosition, contentWidth, 8, "F");
        pdf.setFontSize(10);

        xPosition = margin;
        headers.forEach((header, i) => {
          pdf.text(header, xPosition + 2, yPosition + 5);
          xPosition += colWidths[i];
        });

        yPosition += 8;
      }

      // Alternate row colors
      if (index % 2 === 0) {
        pdf.setFillColor(250, 250, 250);
      } else {
        pdf.setFillColor(255, 255, 255);
      }

      pdf.rect(margin, yPosition, contentWidth, 8, "F");

      xPosition = margin;

      if (activeTab === "agent") {
        pdf.text(item.name.substring(0, 15), xPosition + 2, yPosition + 5);
        xPosition += colWidths[0];

        pdf.text(item.team, xPosition + 2, yPosition + 5);
        xPosition += colWidths[1];

        pdf.text(item.salesCount.toString(), xPosition + 2, yPosition + 5);
        xPosition += colWidths[2];

        pdf.text(item.salesValue, xPosition + 2, yPosition + 5);
        xPosition += colWidths[3];

        pdf.text(item.commission, xPosition + 2, yPosition + 5);
        xPosition += colWidths[4];

        // Color code status
        if (item.status === "Paid") {
          pdf.setTextColor(0, 128, 0);
        } else if (item.status === "Pending") {
          pdf.setTextColor(200, 100, 0);
        } else {
          pdf.setTextColor(0, 0, 200);
        }

        pdf.text(item.status, xPosition + 2, yPosition + 5);
      } else {
        pdf.text(item.name.substring(0, 15), xPosition + 2, yPosition + 5);
        xPosition += colWidths[0];

        pdf.text(item.teamName, xPosition + 2, yPosition + 5);
        xPosition += colWidths[1];

        pdf.text(item.teamSize, xPosition + 2, yPosition + 5);
        xPosition += colWidths[2];

        pdf.text(item.teamSales, xPosition + 2, yPosition + 5);
        xPosition += colWidths[3];

        pdf.text(item.leaderCommission, xPosition + 2, yPosition + 5);
        xPosition += colWidths[4];

        pdf.text(item.ranking, xPosition + 2, yPosition + 5);
      }

      pdf.setTextColor(0, 0, 0); // Reset color

      yPosition += 8;
    });

    // Add footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, 290, {
        align: "center",
      });
      pdf.text(
        "Confidential - For Internal Use Only",
        pageWidth - margin,
        290,
        { align: "right" }
      );
    }

    // Save PDF
    pdf.save(`${activeTab}-performance-report.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-gradient-to-r from-purple-400 to-purple-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <a href="/">
          <img src="/logo.webp" alt="SuperbSite Logo" className="h-10 w-50 b" />
        </a>
      </header>
      <div className="my-6"></div>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-purple-700 text-white p-8 text-center">
          <h1 className="text-3xl font-bold">
            📊 Sales & Commission Dashboard
          </h1>
          <p className="opacity-90 mt-2">
            Real-time analytics and performance tracking
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 border-b border-gray-200">
          <button
            className={`flex-1 py-5 text-center font-semibold transition-all ${
              activeTab === "agent"
                ? "bg-white text-purple-700 border-b-2 border-purple-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => {
              setActiveTab("agent");
              setDataLoaded(false);
            }}
          >
            Agent Portal
          </button>
          <button
            className={`flex-1 py-5 text-center font-semibold transition-all ${
              activeTab === "team"
                ? "bg-white text-purple-700 border-b-2 border-purple-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => {
              setActiveTab("team");
              setDataLoaded(false);
            }}
          >
            Team Portal
          </button>
        </div>

        <div className="p-6">
          {/* Agent Portal Content */}
          {activeTab === "agent" && (
            <div>
              <div ref={dashboardRef}>
                {/* Metrics */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">{metrics.totalSales}</p>
                    <p>Total Sales</p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">
                      {metrics.totalCommission}
                    </p>
                    <p>Total Commission</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">
                      {metrics.completedSales}
                    </p>
                    <p>Completed Sales</p>
                  </div>
                </div>
                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    ref={barChartRef}
                    className="bg-white p-6 rounded-xl shadow"
                  >
                    <h2 className="text-lg font-semibold mb-4 text-black">
                      📈 Sales Over Time
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={agentSalesHistory}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#863E98" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    ref={pieChartRef}
                    className="bg-white p-6 rounded-xl shadow"
                  >
                    <h2 className="text-lg font-semibold mb-4 text-black">
                      💰 Commission Breakdown
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={commissionBreakdown}
                          dataKey="value"
                          nameKey="type"
                          outerRadius={100}
                          label
                        >
                          {commissionBreakdown.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Sales Table */}
                <div className="bg-white p-6 rounded-xl shadow mb-6 text-black">
                  <h2 className="text-lg font-semibold mb-4">
                    🎯 My Sales History
                  </h2>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">Customer</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Commission</th>
                        <th className="p-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mySales.map((s, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="p-3">{s.customer}</td>
                          <td className="p-3">{s.date}</td>
                          <td className="p-3">{s.amount}</td>
                          <td className="p-3">{s.commission}</td>
                          <td className="p-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                s.status === "Paid"
                                  ? "bg-green-100 text-green-700"
                                  : s.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Download Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={downloadPDF}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Download My Report
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`px-6 py-2 rounded-lg shadow transition-colors flex items-center bg-purple-700 text-white hover:bg-purple-800 ml-auto cursor-pointer`}
                >
                  + Add Sale
                </button>
              </div>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 text-black">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Sale</h2>
                {/* Form */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  {/* Buttons */}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Dashboard content to export */}
          {dataLoaded && (
            <div ref={dashboardRef}>
              {/* Metrics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow">
                  <p className="text-2xl font-bold">{metrics.totalSales}</p>
                  <p>Total Sales</p>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-xl shadow">
                  <p className="text-2xl font-bold">
                    {metrics.totalCommission}
                  </p>
                  <p>Total Commission</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow">
                  <p className="text-2xl font-bold">{metrics.activeAgents}</p>
                  <p>Active Agents</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow">
                  <p className="text-2xl font-bold">{metrics.completedSales}</p>
                  <p>Completed Sales</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div
                  ref={barChartRef}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    🏆 Best Sales by Team
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={teamPerformance}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#863E98" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div
                  ref={pieChartRef}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    📍 Sales by Province
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={provinceDistribution}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                      >
                        {provinceDistribution.map((_, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white p-6 rounded-xl shadow mb-6 text-black  ">
                <h2 className="text-lg font-semibold mb-4">
                  🎯 Individual Agent Performance
                </h2>
                <table className="w-full border-collapse text-black">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Agent</th>
                      <th className="p-3 text-left">Team</th>
                      <th className="p-3 text-left">Sales Count</th>
                      <th className="p-3 text-left">Sales Value</th>
                      <th className="p-3 text-left">Commission</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((a, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3">{a.name}</td>
                        <td className="p-3">{a.team}</td>
                        <td className="p-3">{a.salesCount}</td>
                        <td className="p-3">{a.salesValue}</td>
                        <td className="p-3">{a.commission}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              a.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : a.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {agents.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center p-4 text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Download Button at the bottom of the table */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={downloadPDF}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                    Download Agent Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Team Portal Content */}
        {activeTab === "team" && (
          <div>
            {/* Filters */}
            <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow mb-6 text-black">
              <div>
                <label className="text-sm font-semibold">Team Leader</label>
                <select
                  value={leader}
                  onChange={(e) => setLeader(e.target.value)}
                  className="w-full p-2 border rounded-lg mt-1"
                >
                  <option value="">Select Leader</option>
                  {leaders.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Performance Period
                </label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full p-2 border rounded-lg mt-1"
                >
                  <option value="">Select Period</option>
                  {periods.map((per) => (
                    <option key={per}>{per}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={applyFilters}
                className={`px-6 py-2 rounded-lg shadow transition-colors flex items-center ${
                  canLoadData()
                    ? "bg-purple-700 text-white hover:bg-purple-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!canLoadData()}
              >
                Apply Filters
              </button>
            </div>

            {/* Dashboard content to export */}
            {dataLoaded && (
              <div ref={dashboardRef}>
                {/* Metrics */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">
                      {teamMetrics.activeTeams}
                    </p>
                    <p>Active Teams</p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">
                      {teamMetrics.leaderCommission}
                    </p>
                    <p>Leader Commission</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">
                      {teamMetrics.targetAchievement}
                    </p>
                    <p>Target Achievement</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow">
                    <p className="text-2xl font-bold">
                      {teamMetrics.teamSales}
                    </p>
                    <p>Team Sales</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    ref={barChartRef}
                    className="bg-white p-6 rounded-xl shadow"
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      📈 Team Performance Comparison
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={teamPerformance}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#863E98" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div
                    ref={pieChartRef}
                    className="bg-white p-6 rounded-xl shadow"
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      💰 Commission Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={commissionDistribution}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          label
                        >
                          {commissionDistribution.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    👥 Team Leader Performance
                  </h2>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">Team Leader</th>
                        <th className="p-3 text-left">Team Name</th>
                        <th className="p-3 text-left">Team Size</th>
                        <th className="p-3 text-left">Team Sales</th>
                        <th className="p-3 text-left">Leader Commission</th>
                        <th className="p-3 text-left">Team Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamLeaders.map((leader, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="p-3">{leader.name}</td>
                          <td className="p-3">{leader.teamName}</td>
                          <td className="p-3">{leader.teamSize}</td>
                          <td className="p-3">{leader.teamSales}</td>
                          <td className="p-3">{leader.leaderCommission}</td>
                          <td className="p-3">{leader.ranking}</td>
                        </tr>
                      ))}
                      {teamLeaders.length === 0 && (
                        <tr>
                          <td
                            colSpan="6"
                            className="text-center p-4 text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Download Button at the bottom of the table */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={downloadPDF}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Download Team Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
