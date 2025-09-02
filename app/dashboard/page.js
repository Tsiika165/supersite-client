"use client";

import { useEffect, useState, useRef, use } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import router from "next/router";

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

// Time period presets
const timePresets = [
  "Today",
  "This Week",
  "This Month",
  "This Quarter",
  "This Year",
  "Last Month",
  "Last Quarter",
];

const COLORS = ["#863E98", "#e74c3c", "#f39c12", "#2ecc71", "#3498db"];

export default function Dashboard() {
  const dashboardRef = useRef(null);
  const pieChartRef = useRef(null);

  // User role and ID (set via login)
  const [userRole, setUserRole] = useState("Agent"); // Example: "Admin", "TeamLeader", "Agent"
  const [userId, setUserId] = useState("A001"); // Example agent ID
  const loggedInName = "David Wilson"; // Set via login, example for signed-in agent
  const [userTeam] = useState("Team Beta"); // Example team name, could be dynamic

  // Active tab state
  const [activeTab, setActiveTab] = useState(() => {
    return userRole === "Admin" ? "agent" : "team";
  });

  // Filters
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timePreset, setTimePreset] = useState("");
  const [team, setTeam] = useState("");
  const [agent, setAgent] = useState("");
  const [province, setProvince] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [commissionStatus, setCommissionStatus] = useState("");
  const [leaderboardPeriod, setLeaderboardPeriod] = useState("This Month");

  // Sale submission state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleData, setSaleData] = useState({
    customerName: "",
    amount: "",
    saleDate: "",
  });

  // Data loaded state
  const [dataLoaded, setDataLoaded] = useState(false);

  // Dynamic filters
  const [teams, setTeams] = useState(["Team Alpha", "Team Beta", "Team Gamma"]);
  const [agents, setAgents] = useState([
    "Sarah Johnson",
    "James Smith",
    "Michael Brown",
    "Emily Wilson",
    "David Wilson",
  ]);
  const [leaders, setLeaders] = useState([
    "Alice Brown",
    "David Wilson",
    "Lisa Martinez",
  ]);

  // Data
  const [metrics, setMetrics] = useState({
    totalSales: "R 0",
    totalCommission: "R 0",
    activeAgents: 0,
    completedSales: 0,
    commissionPaid: "R 0",
    commissionPending: "R 0",
  });

  const [agentData, setAgentData] = useState([]);
  const [pendingSales, setPendingSales] = useState([]);
  const [provinceDistribution, setProvinceDistribution] = useState([]);

  // Team data
  const [teamMetrics, setTeamMetrics] = useState({
    activeTeams: 0,
    leaderCommission: "R 0",
    targetAchievement: "0%",
    teamSales: 0,
    totalCommissionPaid: "R 0",
    totalCommissionPending: "R 0",
  });

  const [teamLeaderData, setTeamLeaderData] = useState([]);
  const [commissionDistribution, setCommissionDistribution] = useState([]);

  useEffect(() => {
    setTeams(["Team Alpha", "Team Beta", "Team Gamma"]);
    setLeaders(["Alice Brown", "David Wilson", "Lisa Martinez"]);
    setAgents([
      "Sarah Johnson",
      "James Smith",
      "Michael Brown",
      "Emily Wilson",
      "David Wilson",
    ]);
  }, []);

  const canLoadData = () => {
    return true; // Temporarily bypass strict filter checks
  };

  const applyFilters = () => {
    setDataLoaded(true);

    if (activeTab === "agent" && userRole === "Admin") {
      setMetrics({
        totalSales: "R 8.5M",
        totalCommission: "R 645K",
        activeAgents: 287,
        completedSales: 234,
        commissionPaid: "R 387K",
        commissionPending: "R 258K",
      });
      setAgentData(
        [
          {
            name: "Sarah Johnson",
            score: 88,
            category: "Runner Up",
            pending: "R 9,000",
            received: "R 12,000",
            status: "Pending",
            totalSalesCount: 5,
            sumSalePrice: 450000,
            earnings: 22500,
          },
          {
            name: "James Smith",
            score: 75,
            category: "On Target",
            pending: "R 16,000",
            received: "R 8,000",
            status: "Pending",
            totalSalesCount: 4,
            sumSalePrice: 320000,
            earnings: 16000,
          },
          {
            name: "Michael Brown",
            score: 82,
            category: "On Target",
            pending: "R 0",
            received: "R 19,000",
            status: "Paid",
            totalSalesCount: 6,
            sumSalePrice: 380000,
            earnings: 19000,
          },
          {
            name: "Emily Wilson",
            score: 95,
            category: "Top Performer",
            pending: "R 10,400",
            received: "R 15,600",
            status: "Partially Paid",
            totalSalesCount: 7,
            sumSalePrice: 520000,
            earnings: 26000,
          },
          {
            name: "David Wilson",
            score: 78,
            category: "On Target",
            pending: "R 14,500",
            received: "R 13,900",
            status: "Pending",
            totalSalesCount: 3,
            sumSalePrice: 290000,
            earnings: 28400,
          },
        ]
          .filter((a) => !agent || a.name === agent)
          .filter((a) => !team || a.team === team)
          .filter((a) => !province || a.province === province)
          .filter((a) => !paymentStatus || a.status === paymentStatus)
          .filter(
            (a) =>
              !commissionStatus ||
              (commissionStatus === "Paid"
                ? a.pending === "R 0"
                : a.pending !== "R 0")
          )
      );
      setProvinceDistribution([
        { name: "Gauteng", value: 35 },
        { name: "Western Cape", value: 25 },
        { name: "KwaZulu-Natal", value: 20 },
        { name: "Eastern Cape", value: 10 },
        { name: "Other", value: 10 },
      ]);
    } else if (activeTab === "team") {
      const teamFilter = userRole === "TeamLeader" ? userId : ""; // Restrict to leader's team
      setTeamMetrics({
        activeTeams: 9,
        leaderCommission: "R 285,600",
        targetAchievement: "98%",
        teamSales: 642,
        totalCommissionPaid: "R 250,000",
        totalCommissionPending: "R 45,000",
      });
      setTeamLeaderData(
        [
          {
            name: "Alice Brown",
            teamName: "Team Alpha",
            teamSize: "12 agents",
            teamSales: "R 890,000",
            leaderCommission: "R 35,600",
            ranking: "🥇 #1",
            commissionPending: "R 14,240",
            commissionReceived: "R 21,360",
            status: "Partially Paid",
          },
          {
            name: "David Wilson",
            teamName: "Team Beta",
            teamSize: "9 agents",
            teamSales: "R 710,000",
            leaderCommission: "R 28,400",
            ranking: "🥈 #2",
            commissionPending: "R 11,360",
            commissionReceived: "R 17,040",
            status: "Pending",
          },
          {
            name: "Lisa Martinez",
            teamName: "Team Gamma",
            teamSize: "11 agents",
            teamSales: "R 685,000",
            leaderCommission: "R 27,400",
            ranking: "🥉 #3",
            commissionPending: "R 0",
            commissionReceived: "R 27,400",
            status: "Paid",
          },
        ]
          .filter((l) => !teamFilter || l.name === teamFilter)
          .filter((l) => !paymentStatus || l.status === paymentStatus)
      );
      setCommissionDistribution([
        { name: "Leader Bonus", value: 35 },
        { name: "Team Bonus", value: 30 },
        { name: "Individual", value: 25 },
        { name: "Performance", value: 10 },
      ]);

      // Create pending sales data with received commissions
      const pendingSalesData = [
        {
          saleDate: "2025-09-01",
          customerName: "John Doe",
          salePrice: "R 10,000",
          pendingCommission: "R 2,000",
          receivedCommission: "R 0",
          status: "Pending",
        },
        {
          saleDate: "2025-09-02",
          customerName: "Jane Smith",
          salePrice: "R 5,000",
          pendingCommission: "R 1,000",
          receivedCommission: "R 0",
          status: "Pending",
        },
        {
          saleDate: "2025-08-15",
          customerName: "Alice Johnson",
          salePrice: "R 15,000",
          pendingCommission: "R 3,000",
          receivedCommission: "R 0",
          status: "Pending",
        },
        {
          saleDate: "2025-08-10",
          customerName: "Bob Williams",
          salePrice: "R 12,000",
          pendingCommission: "R 0",
          receivedCommission: "R 2,400",
          status: "Received",
        },
        {
          saleDate: "2025-08-05",
          customerName: "Charlie Brown",
          salePrice: "R 8,000",
          pendingCommission: "R 0",
          receivedCommission: "R 1,600",
          status: "Received",
        },
      ].filter((s) => !paymentStatus || s.status === paymentStatus);

      // Filter to show only logged-in user's data if they're an agent
      if (userRole === "Agent") {
        setPendingSales(pendingSalesData);
      } else {
        setPendingSales(pendingSalesData);
      }

      setAgentData(
        [
          {
            name: "Sarah Johnson",
            team: "Team Alpha",
            totalSalesCount: 5,
            sumSalePrice: 450000,
            earnings: 22500,
            pendingCommission: "R 9,000",
            receivedCommission: "R 13,500",
          },
          {
            name: "James Smith",
            team: "Team Beta",
            totalSalesCount: 4,
            sumSalePrice: 320000,
            earnings: 16000,
            pendingCommission: "R 16,000",
            receivedCommission: "R 0",
          },
          {
            name: "Michael Brown",
            team: "Team Gamma",
            totalSalesCount: 6,
            sumSalePrice: 380000,
            earnings: 19000,
            pendingCommission: "R 0",
            receivedCommission: "R 19,000",
          },
          {
            name: "Emily Wilson",
            team: "Team Alpha",
            totalSalesCount: 7,
            sumSalePrice: 520000,
            earnings: 26000,
            pendingCommission: "R 10,400",
            receivedCommission: "R 15,600",
          },
          {
            name: "David Wilson",
            team: "Team Beta",
            totalSalesCount: 3,
            sumSalePrice: 290000,
            earnings: 28400,
            pendingCommission: "R 14,500",
            receivedCommission: "R 13,900",
          },
        ]
          .filter((a) => userRole !== "Agent" || a.name === loggedInName)
          .sort((a, b) => b.totalSalesCount - a.totalSalesCount)
      );
    }
  };

  const handleSaleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to submit sale (pending approval)
    console.log("Sale submitted:", {
      ...saleData,
      agentId: userId,
      status: "Pending",
    });
    setIsModalOpen(false);
    setSaleData({ customerName: "", amount: "", saleDate: "" });
    alert("Sale submitted for approval. Check with your team leader.");
  };

  const chartToImage = async (chartRef, backgroundColor = "#ffffff") => {
    if (!chartRef.current) return null;
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor,
      scale: 2,
    });
    return canvas.toDataURL("image/png");
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;

    pdf.setFillColor(60, 50, 100);
    pdf.rect(margin, 10, 30, 10, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text("COMPANY", margin + 5, 16);

    pdf.setFontSize(16);
    pdf.setTextColor(60, 50, 100);
    pdf.text(
      `${activeTab === "agent" ? "AGENT" : "TEAM"} PERFORMANCE REPORT`,
      pageWidth / 2,
      20,
      { align: "center" }
    );

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `Generated on: ${new Date().toLocaleString("en-ZA", {
        timeZone: "Africa/Johannesburg",
      })}`,
      pageWidth - margin,
      15,
      { align: "right" }
    );

    let yPosition = 30;

    pdf.setFontSize(12);
    pdf.setTextColor(60, 50, 100);
    pdf.text("FILTERS APPLIED:", margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);
    if (activeTab === "agent" && userRole === "Admin") {
      pdf.text(
        `Date Range: ${dateFrom || timePreset || "All"} to ${dateTo || ""}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(`Team: ${team || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Agent: ${agent || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Province: ${province || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Payment Status: ${paymentStatus || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(
        `Commission Status: ${commissionStatus || "All"}`,
        margin,
        yPosition
      );
    } else if (activeTab === "team") {
      pdf.text(`Time Period: ${timePreset}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Payment Status: ${paymentStatus || "All"}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Leaderboard Period: ${leaderboardPeriod}`, margin, yPosition);
    }
    yPosition += 10;

    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    pdf.setFontSize(12);
    pdf.setTextColor(60, 50, 100);
    pdf.text("KEY METRICS:", margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);
    if (activeTab === "agent" && userRole === "Admin") {
      pdf.text(`Total Sales: ${metrics.totalSales}`, margin, yPosition);
      yPosition += 5;
      pdf.text(
        `Total Commission: ${metrics.totalCommission}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(`Commission Paid: ${metrics.commissionPaid}`, margin, yPosition);
      yPosition += 5;
      pdf.text(
        `Commission Pending: ${metrics.commissionPending}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(`Active Agents: ${metrics.activeAgents}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Completed Sales: ${metrics.completedSales}`, margin, yPosition);
    } else if (activeTab === "team") {
      pdf.text(`Active Teams: ${teamMetrics.activeTeams}`, margin, yPosition);
      yPosition += 5;
      pdf.text(
        `Leader Commission: ${teamMetrics.leaderCommission}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Commission Paid: ${teamMetrics.totalCommissionPaid}`,
        margin,
        yPosition
      );
      yPosition += 5;
      pdf.text(
        `Commission Pending: ${teamMetrics.totalCommissionPending}`,
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

    const pieChartImg = await chartToImage(pieChartRef);
    if (pieChartImg) {
      pdf.addImage(pieChartImg, "PNG", margin, yPosition, contentWidth, 80);
    }
    yPosition += 90;

    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }

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

    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPosition, contentWidth, 8, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);

    let colWidths, headers, data;
    if (activeTab === "agent" && userRole === "Admin") {
      colWidths = [20, 30, 25, 25, 25];
      headers = ["Rank", "Agent", "Score", "Category", "Pending"];
      data = agentData.map((a, i) => ({ ...a, rank: i + 1 }));
    } else if (activeTab === "team") {
      colWidths = [20, 30, 30, 25, 25];
      headers = ["Rank", "Name", "Team", "Commission", "Pending"];
      data = (userRole === "TeamLeader" ? teamLeaderData : agentData)
        .map((item, i) => ({ ...item, rank: i + 1 }))
        .filter((item) =>
          userRole === "Agent" ? item.name === "LoggedInAgentName" : true
        );
    }

    let xPosition = margin;
    headers.forEach((header, i) => {
      pdf.text(header, xPosition + 2, yPosition + 5);
      xPosition += colWidths[i];
    });

    yPosition += 8;

    pdf.setFontSize(8);
    data.forEach((item, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = margin;
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
      if (index % 2 === 0) pdf.setFillColor(250, 250, 250);
      else pdf.setFillColor(255, 255, 255);
      pdf.rect(margin, yPosition, contentWidth, 8, "F");

      xPosition = margin;
      if (activeTab === "agent" && userRole === "Admin") {
        pdf.text(item.rank.toString(), xPosition + 2, yPosition + 5);
        xPosition += colWidths[0];
        pdf.text(item.name.substring(0, 12), xPosition + 2, yPosition + 5);
        xPosition += colWidths[1];
        pdf.text(item.score.toString(), xPosition + 2, yPosition + 5);
        xPosition += colWidths[2];
        pdf.text(item.category, xPosition + 2, yPosition + 5);
        xPosition += colWidths[3];
        pdf.text(item.pending.substring(0, 8), xPosition + 2, yPosition + 5);
      } else if (activeTab === "team") {
        pdf.text(item.rank.toString(), xPosition + 2, yPosition + 5);
        xPosition += colWidths[0];
        pdf.text(item.name.substring(0, 12), xPosition + 2, yPosition + 5);
        xPosition += colWidths[1];
        pdf.text(
          (item.teamName || item.team || "").substring(0, 10),
          xPosition + 2,
          yPosition + 5
        );
        xPosition += colWidths[2];
        pdf.text(
          (item.leaderCommission || item.commission || "").substring(0, 8),
          xPosition + 2,
          yPosition + 5
        );
        xPosition += colWidths[3];
        pdf.text(
          item.commissionPending.substring(0, 8),
          xPosition + 2,
          yPosition + 5
        );
      }
      yPosition += 8;
    });

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

    pdf.save(`${activeTab}-performance-report.pdf`);
  };

  const handleLogout = () => {
    // Simulate logout (e.g., clear session, redirect to login)
    console.log("Logged out");
    alert("Logged out successfully. Please log in again.");
    // In a real app, redirect to login page: window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Section */}
        <div className="p-4 flex justify-end">
          <div className="relative">
            <button className="flex items-center space-x-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none">
              <span>{loggedInName}</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <div className="px-4 py-2 text-sm text-gray-700">
                {loggedInName} ({userRole})
                {userRole !== "Admin" && <div>Team: {userTeam}</div>}
              </div>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile/Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-purple-700 text-white p-8 text-center">
          <h1 className="text-3xl font-bold">
            📊 Sales & Commission Dashboard
          </h1>
          <p className="opacity-90 mt-2">
            Real-time analytics and performance tracking
          </p>
        </div>

        <div className="flex bg-gray-100 border-b border-gray-200">
          {userRole === "Admin" && (
            <button
              className={`flex-1 py-5 text-center font-semibold transition-all ${
                activeTab === "agent"
                  ? "bg-white text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("agent")}
            >
              Admin Portal
            </button>
          )}
          {(userRole === "TeamLeader" || userRole === "Agent") && (
            <button
              className={`flex-1 py-5 text-center font-semibold transition-all ${
                activeTab === "team"
                  ? "bg-white text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("team")}
            >
              Team Portal
            </button>
          )}
        </div>

        <div className="p-6">
          {activeTab === "agent" && userRole === "Admin" && (
            <div>
              <div className="grid md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow mb-6">
                <div>
                  <label className="text-sm font-semibold">Date Range</label>
                  <select
                    value={timePreset}
                    onChange={(e) => setTimePreset(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">Select Preset</option>
                    {timePresets.map((preset) => (
                      <option key={preset}>{preset}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Date From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Date To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Team</label>
                  <select
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">All Teams</option>
                    {teams.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Agent</label>
                  <select
                    value={agent}
                    onChange={(e) => setAgent(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">All Agents</option>
                    {agents.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Province</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">All Provinces</option>
                    {provinces.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Received">Received</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Commission Status
                  </label>
                  <select
                    value={commissionStatus}
                    onChange={(e) => setCommissionStatus(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="">All</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
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

              {dataLoaded && (
                <div ref={dashboardRef}>
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
                        {metrics.commissionPaid}
                      </p>
                      <p>Commission Paid</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow">
                      <p className="text-2xl font-bold">
                        {metrics.commissionPending}
                      </p>
                      <p>Commission Pending</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                      <h2 className="text-lg font-semibold mb-4">
                        🏆 Agent Leaderboard
                      </h2>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-left">Rank</th>
                            <th className="p-3 text-left">Agent</th>
                            <th className="p-3 text-left">Score</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Pending</th>
                            <th className="p-3 text-left">Received</th>
                          </tr>
                        </thead>
                        <tbody>
                          {agentData.map((a, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-3">{i + 1}</td>
                              <td className="p-3">{a.name}</td>
                              <td className="p-3">{a.score}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    a.category === "Top Performer"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : a.category === "Runner Up"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {a.category}
                                </span>
                              </td>
                              <td className="p-3">{a.pending}</td>
                              <td className="p-3">{a.received}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

                  <div className="bg-white p-6 rounded-xl shadow mb-6">
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
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1  0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                        Download Agent Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "team" &&
            (userRole === "TeamLeader" || userRole === "Agent") && (
              <div>
                <div className="grid md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow mb-6">
                  <div>
                    <label className="text-sm font-semibold">Time Period</label>
                    <select
                      value={timePreset}
                      onChange={(e) => setTimePreset(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    >
                      <option value="">Select Period</option>
                      {[
                        "This Month",
                        "Last Month",
                        "Quarter to Date",
                        "All Time",
                      ].map((preset) => (
                        <option key={preset}>{preset}</option>
                      ))}
                    </select>
                  </div>
                  {userRole === "TeamLeader" && (
                    <div>
                      <label className="text-sm font-semibold">Agent</label>
                      <select
                        value={agent}
                        onChange={(e) => setAgent(e.target.value)}
                        className="w-full p-2 border rounded-lg mt-1"
                      >
                        <option value="">All Team Agents</option>
                        {agents
                          .filter((a) => a.team === team)
                          .map((a) => (
                            <option key={a}>{a}</option>
                          ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold">
                      Payment Status
                    </label>
                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    >
                      <option value="">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Received">Received</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">
                      Leaderboard Period
                    </label>
                    <select
                      value={leaderboardPeriod}
                      onChange={(e) => setLeaderboardPeriod(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1"
                    >
                      <option value="">Select Period</option>
                      {[
                        "This Month",
                        "Last Month",
                        "This Quarter",
                        "All Time",
                      ].map((period) => (
                        <option key={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 mb-6">
                  {userRole === "Agent" && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-6 py-2 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800 transition-colors flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      Add Sale
                    </button>
                  )}
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

                {isModalOpen && userRole === "Agent" && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                      <h2 className="text-xl font-semibold mb-4">
                        Add New Sale
                      </h2>
                      <form className="space-y-4" onSubmit={handleSaleSubmit}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            value={saleData.customerName}
                            onChange={(e) =>
                              setSaleData({
                                ...saleData,
                                customerName: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Enter customer name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sale Amount
                          </label>
                          <input
                            type="number"
                            value={saleData.amount}
                            onChange={(e) =>
                              setSaleData({
                                ...saleData,
                                amount: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Enter amount"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sale Date
                          </label>
                          <input
                            type="date"
                            value={saleData.saleDate}
                            onChange={(e) =>
                              setSaleData({
                                ...saleData,
                                saleDate: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                          >
                            Submit Sale
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {dataLoaded && (
                  <div ref={dashboardRef}>
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
                          {teamMetrics.totalCommissionPaid}
                        </p>
                        <p>Commission Paid</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow">
                        <p className="text-2xl font-bold">
                          {teamMetrics.totalCommissionPending}
                        </p>
                        <p>Commission Pending</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4">
                          🏆 Team Leaderboard
                        </h2>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-3 text-left">Rank</th>
                              <th className="p-3 text-left">Name</th>
                              <th className="p-3 text-left">Team</th>
                              <th className="p-3 text-left">Commission</th>
                              <th className="p-3 text-left">Pending</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamLeaderData.map((l, i) => (
                              <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3">{l.name}</td>
                                <td className="p-3">{l.teamName}</td>
                                <td className="p-3">{l.leaderCommission}</td>
                                <td className="p-3">{l.commissionPending}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div
                        ref={pieChartRef}
                        className="bg-white p-6 rounded-xl shadow"
                      >
                        <h2 className="text-lg font-semibold mb-4">
                          📊 Commission Distribution
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

                    <div className="bg-white p-6 rounded-xl shadow mb-6">
                      <h2 className="text-lg font-semibold mb-4">
                        My Pending Commissions
                      </h2>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Sale Price</th>
                            <th className="p-3 text-left">
                              Pending Commission
                            </th>
                            <th className="p-3 text-left">
                              Received Commission
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingSales
                            .filter((s) => s.agentName === loggedInName) // Show only logged-in user's data
                            .map((s, i) => (
                              <tr key={i} className="border-b hover:bg-gray-50">
                                <td className="p-3">{s.saleDate}</td>
                                <td className="p-3">{s.customerName}</td>
                                <td className="p-3">{s.salePrice}</td>
                                <td className="p-3">{s.pendingCommission}</td>
                                <td className="p-3">
                                  {paymentStatus === "Pending"
                                    ? "####"
                                    : s.receivedCommission ||
                                      s.pendingCommission}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow mb-6">
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
    </div>
  );
}
