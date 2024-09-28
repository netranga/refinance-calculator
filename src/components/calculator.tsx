"use client";

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowRight, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'

export default function WhiteGreenRefinanceCalculator() {
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined)

  const properties = {
    'my-home': {
      name: 'My Home',
      currentRate: 3.5,
      currentPayment: 1796.18,
      newRate: 3.25,
      newPayment: 1740.83,
      loanAmount: 400000,
      loanTerm: 30
    },
    'boyfriend-home': {
      name: "Boyfriend's Home",
      currentRate: 3.75,
      currentPayment: 1620.83,
      newRate: 3.25,
      newPayment: 1566.76,
      loanAmount: 350000,
      loanTerm: 30
    }
  }

  type PropertyKey = 'my-home' | 'boyfriend-home'
  const selectedPropertyDetails = selectedProperty ? properties[selectedProperty as PropertyKey] : null

  const chartData = [
    { year: 2024, currentBalance: 400000, newBalance: 400000 },
    { year: 2034, currentBalance: 300000, newBalance: 290000 },
    { year: 2044, currentBalance: 150000, newBalance: 130000 },
    { year: 2054, currentBalance: 0, newBalance: 0 },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-teal-700">Refinance Calculator</h1>
        
        <Card className="bg-teal-50 mb-8 border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-700">Today's Interest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-5xl font-bold text-teal-700">3.25%</p>
              <div className="flex items-center text-teal-600">
                <TrendingDown className="mr-2" />
                <span>Down 0.125% from yesterday</span>
              </div>
            </div>
            <p className="mt-4 text-teal-600">
              Rates have dropped slightly, making it a good time to consider refinancing. 
              The Federal Reserve has indicated they may hold rates steady in the coming months.
            </p>
          </CardContent>
        </Card>

        <div className="mb-8">
          <Select onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-full bg-teal-600 text-white border-teal-700 hover:bg-teal-700 transition-colors">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="my-home">My Home</SelectItem>
              <SelectItem value="boyfriend-home">Boyfriend's Home</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedPropertyDetails && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-700">Current Monthly Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-teal-700">${selectedPropertyDetails.currentPayment.toFixed(2)}</p>
                  <p className="text-teal-600 mt-2">at {selectedPropertyDetails.currentRate}% interest</p>
                </CardContent>
              </Card>

              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-700">New Monthly Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-teal-700">${selectedPropertyDetails.newPayment.toFixed(2)}</p>
                  <p className="text-teal-600 mt-2">at {selectedPropertyDetails.newRate}% interest</p>
                  <div className="flex items-center mt-4 text-teal-600">
                    <ArrowRight className="mr-2" />
                    <span>Monthly savings: ${(selectedPropertyDetails.currentPayment - selectedPropertyDetails.newPayment).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-teal-50 mb-8 border-teal-200">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-700">Refinance Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-teal-600" />
                    <div>
                      <p className="font-semibold text-teal-700">Total Savings</p>
                      <p className="text-2xl font-bold text-teal-700">${((selectedPropertyDetails.currentPayment - selectedPropertyDetails.newPayment) * 12 * selectedPropertyDetails.loanTerm).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingDown className="mr-2 text-teal-600" />
                    <div>
                      <p className="font-semibold text-teal-700">Interest Rate Reduction</p>
                      <p className="text-2xl font-bold text-teal-700">{(selectedPropertyDetails.currentRate - selectedPropertyDetails.newRate).toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-teal-600" />
                    <div>
                      <p className="font-semibold text-teal-700">Break-Even Point</p>
                      <p className="text-2xl font-bold text-teal-700">18 months</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-700">Loan Amortization</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-teal-100">
                    <TabsTrigger value="chart" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Chart</TabsTrigger>
                    <TabsTrigger value="comparison" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">Comparison</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#14b8a6" />
                        <XAxis dataKey="year" stroke="#0f766e" />
                        <YAxis stroke="#0f766e" />
                        <Tooltip contentStyle={{ backgroundColor: '#f0fdfa', border: '1px solid #14b8a6' }} />
                        <Legend />
                        <Line type="monotone" dataKey="currentBalance" name="Current Loan" stroke="#0d9488" strokeWidth={2} />
                        <Line type="monotone" dataKey="newBalance" name="Refinanced Loan" stroke="#0891b2" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="comparison">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <h3 className="font-semibold mb-2 text-teal-700">Current Loan</h3>
                        <p className="text-teal-600">Monthly Payment: ${selectedPropertyDetails.currentPayment.toFixed(2)}</p>
                        <p className="text-teal-600">Interest Rate: {selectedPropertyDetails.currentRate}%</p>
                        <p className="text-teal-600">Total Interest: ${((selectedPropertyDetails.currentPayment * 12 * selectedPropertyDetails.loanTerm) - selectedPropertyDetails.loanAmount).toFixed(2)}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-teal-700">Refinanced Loan</h3>
                        <p className="text-teal-600">Monthly Payment: ${selectedPropertyDetails.newPayment.toFixed(2)}</p>
                        <p className="text-teal-600">Interest Rate: {selectedPropertyDetails.newRate}%</p>
                        <p className="text-teal-600">Total Interest: ${((selectedPropertyDetails.newPayment * 12 * selectedPropertyDetails.loanTerm) - selectedPropertyDetails.loanAmount).toFixed(2)}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}