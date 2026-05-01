import { describe, it, expect } from 'vitest'
import { getSummaryData } from '../statement'
import { CSVData } from '@/types'

describe('getSummaryData', () => {
  const mockData: CSVData[] = [
    {
      date: '2024-01-01',
      counterparty: 'Company A',
      description: 'Service payment',
      amount: 1000
    },
    {
      date: '2024-01-02',
      counterparty: 'Company B',
      description: 'Software license',
      amount: -500
    },
    {
      date: '2024-01-03',
      counterparty: 'Company A',
      description: 'Consulting fee',
      amount: 2000
    },
    {
      date: '2024-01-04',
      counterparty: 'Company C',
      description: 'Office supplies',
      amount: -200
    },
    {
      date: '2024-01-05',
      counterparty: 'Company B',
      description: 'Support contract',
      amount: 1500
    }
  ]

  describe('basic calculations', () => {
    it('should calculate total income correctly', () => {
      const result = getSummaryData(mockData)
      expect(result.totalIncome).toBe(4500) // 1000 + 2000 + 1500
    })

    it('should calculate total expenses correctly', () => {
      const result = getSummaryData(mockData)
      expect(result.totalExpenses).toBe(700) // 500 + 200 (absolute values)
    })

    it('should calculate net result correctly', () => {
      const result = getSummaryData(mockData)
      expect(result.netResult).toBe(3800) // 4500 - 700
    })

    it('should count total transactions correctly', () => {
      const result = getSummaryData(mockData)
      expect(result.transactionCount).toBe(5)
    })
  })

  describe('counterparty aggregation', () => {
    it('should aggregate transactions by counterparty correctly', () => {
      const result = getSummaryData(mockData)
      const counterparties = result.topCounterparties

      // Company A: 1000 + 2000 = 3000 total, 2 transactions, 3000 income, 0 expenses
      const companyA = counterparties.find(c => c.name === 'Company A')
      expect(companyA).toEqual({
        name: 'Company A',
        totalAmount: 3000,
        transactionCount: 2,
        income: 3000,
        expenses: 0
      })

      // Company B: -500 + 1500 = 2000 total, 2 transactions, 1500 income, 500 expenses
      const companyB = counterparties.find(c => c.name === 'Company B')
      expect(companyB).toEqual({
        name: 'Company B',
        transactionCount: 2,
        totalAmount: 2000,
        income: 1500,
        expenses: 500
      })

      // Company C: -200 = 200 total, 1 transaction, 0 income, 200 expenses
      const companyC = counterparties.find(c => c.name === 'Company C')
      expect(companyC).toEqual({
        name: 'Company C',
        transactionCount: 1,
        totalAmount: 200,
        income: 0,
        expenses: 200
      })
    })
  })

  describe('sorting functionality', () => {
    it('should sort by totalAmount by default', () => {
      const result = getSummaryData(mockData)
      const sorted = result.topCounterparties
      
      expect(sorted[0].name).toBe('Company A') // 3000
      expect(sorted[1].name).toBe('Company B') // 2000
      expect(sorted[2].name).toBe('Company C') // 200
    })

    it('should sort by income when specified', () => {
      const result = getSummaryData(mockData, 5, 'income')
      const sorted = result.topCounterparties
      
      expect(sorted[0].name).toBe('Company A') // 3000 income
      expect(sorted[1].name).toBe('Company B') // 1500 income
      expect(sorted[2].name).toBe('Company C') // 0 income
    })

    it('should sort by expenses when specified', () => {
      const result = getSummaryData(mockData, 5, 'expenses')
      const sorted = result.topCounterparties
      
      expect(sorted[0].name).toBe('Company B') // 500 expenses
      expect(sorted[1].name).toBe('Company C') // 200 expenses
      expect(sorted[2].name).toBe('Company A') // 0 expenses
    })

    it('should sort by transactionCount when specified', () => {
      const result = getSummaryData(mockData, 5, 'transactionCount')
      const sorted = result.topCounterparties
      
      // Company A and B both have 2 transactions, Company C has 1
      expect(sorted[0].transactionCount).toBe(2)
      expect(sorted[1].transactionCount).toBe(2)
      expect(sorted[2].transactionCount).toBe(1)
    })
  })

  describe('limit functionality', () => {
    it('should limit results to specified number', () => {
      const result = getSummaryData(mockData, 2)
      expect(result.topCounterparties).toHaveLength(2)
      expect(result.topCounterparties[0].name).toBe('Company A')
      expect(result.topCounterparties[1].name).toBe('Company B')
    })

    it('should use default limit of 5 when not specified', () => {
      const result = getSummaryData(mockData)
      expect(result.topCounterparties).toHaveLength(3) // Only 3 counterparties in test data
    })

    it('should handle limit larger than available counterparties', () => {
      const result = getSummaryData(mockData, 10)
      expect(result.topCounterparties).toHaveLength(3) // All counterparties returned
    })
  })

  describe('edge cases', () => {
    it('should handle empty data array', () => {
      const result = getSummaryData([])
      
      expect(result.totalIncome).toBe(0)
      expect(result.totalExpenses).toBe(0)
      expect(result.netResult).toBe(0)
      expect(result.transactionCount).toBe(0)
      expect(result.topCounterparties).toHaveLength(0)
    })

    it('should handle only positive amounts (income only)', () => {
      const incomeOnlyData = [
        { date: '2024-01-01', counterparty: 'Company X', description: 'Payment', amount: 1000 },
        { date: '2024-01-02', counterparty: 'Company Y', description: 'Fee', amount: 500 }
      ]
      
      const result = getSummaryData(incomeOnlyData)
      
      expect(result.totalIncome).toBe(1500)
      expect(result.totalExpenses).toBe(0)
      expect(result.netResult).toBe(1500)
      expect(result.topCounterparties[0].expenses).toBe(0)
    })

    it('should handle only negative amounts (expenses only)', () => {
      const expenseOnlyData = [
        { date: '2024-01-01', counterparty: 'Vendor X', description: 'Cost', amount: -1000 },
        { date: '2024-01-02', counterparty: 'Vendor Y', description: 'Fee', amount: -500 }
      ]
      
      const result = getSummaryData(expenseOnlyData)
      
      expect(result.totalIncome).toBe(0)
      expect(result.totalExpenses).toBe(1500)
      expect(result.netResult).toBe(-1500)
      expect(result.topCounterparties[0].income).toBe(0)
    })

    it('should handle zero amounts', () => {
      const dataWithZero = [
        { date: '2024-01-01', counterparty: 'Company X', description: 'Payment', amount: 0 },
        { date: '2024-01-02', counterparty: 'Company X', description: 'Fee', amount: 1000 }
      ]
      
      const result = getSummaryData(dataWithZero)
      
      expect(result.totalIncome).toBe(1000)
      expect(result.totalExpenses).toBe(0)
      expect(result.transactionCount).toBe(2)
    })

    it('should handle duplicate counterparties correctly', () => {
      const duplicateData = [
        { date: '2024-01-01', counterparty: 'Same Company', description: 'Payment 1', amount: 1000 },
        { date: '2024-01-02', counterparty: 'Same Company', description: 'Payment 2', amount: -200 },
        { date: '2024-01-03', counterparty: 'Same Company', description: 'Payment 3', amount: 500 }
      ]
      
      const result = getSummaryData(duplicateData)
      const company = result.topCounterparties[0]
      
      expect(company.name).toBe('Same Company')
      expect(company.totalAmount).toBe(1700) // 1000 + 200 + 500 (absolute values)
      expect(company.transactionCount).toBe(3)
      expect(company.income).toBe(1500) // 1000 + 500
      expect(company.expenses).toBe(200) // 200 (absolute value)
    })
  })

  describe('data integrity', () => {
    it('should not mutate input data', () => {
      const originalData = [...mockData]
      getSummaryData(mockData)
      
      expect(mockData).toEqual(originalData)
    })

    it('should handle large numbers correctly', () => {
      const largeNumberData = [
        { date: '2024-01-01', counterparty: 'Big Corp', description: 'Large payment', amount: 1000000 },
        { date: '2024-01-02', counterparty: 'Big Corp', description: 'Large expense', amount: -500000 }
      ]
      
      const result = getSummaryData(largeNumberData)
      
      expect(result.totalIncome).toBe(1000000)
      expect(result.totalExpenses).toBe(500000)
      expect(result.netResult).toBe(500000)
    })
  })
})
