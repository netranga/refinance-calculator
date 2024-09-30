"use client";

import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhiteGreenRefinanceCalculator() {
  const [properties, setProperties] = useState<Array<any>>([])
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties')
        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }
        const data = await response.json()
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      }
    }

    fetchProperties()
  }, [])

  const formatPercentage = (value: number | undefined) => {
    if (typeof value !== 'number') return 'N/A'
    return `${value.toFixed(2)}%`
  }

  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== 'number') return 'N/A'
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-4xl font-bold text-teal-700 mb-8">Refinance Calculator</h1>
      
      <div className="mb-8">
        <Select onValueChange={(value) => {
          const selected = properties.find(p => p.id.toString() === value)
          setSelectedProperty(selected)
        }}>
          <SelectTrigger className="w-full bg-teal-600 text-white border-teal-700 hover:bg-teal-700 transition-colors">
            <SelectValue placeholder="Select a homeowner" />
          </SelectTrigger>
          <SelectContent>
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id.toString()}>{property.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProperty && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-teal-50 mb-8 border-teal-200">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-700">Current Interest Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-teal-700">{formatPercentage(selectedProperty.interestRate)}</p>
            </CardContent>
          </Card>

          <Card className="bg-teal-50 mb-8 border-teal-200">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-700">Home Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-teal-700">{formatCurrency(selectedProperty.homeValue)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}