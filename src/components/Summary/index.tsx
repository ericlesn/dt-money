import React, { useContext } from 'react'
import { Container } from './styles'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext'
import { TransactionsTable } from '../TransactionsTable'

export function Summary() {
    const {transactions} = useContext(TransactionsContext)
    console.log(transactions)


    /* const totalDeposits = transactions.reduce((acc,transaction)=>{
        if(transaction.type === 'deposit'){
            return acc + transaction.amount
        }

        return acc
    }, 0)


    const totalWithdraw = transactions.reduce((acc,transaction)=>{
        if(transaction.type === 'withdraw'){
            return acc - transaction.amount
        }

        return acc
    }, 0)

    const total = transactions.reduce((saldo,transaction)=>{
        if(transaction.type === 'withdraw' || 'deposit'){
            return saldo = totalDeposits + totalWithdraw
        }

        return saldo
    }, 0) */


    const summary = transactions.reduce((acc, transaction)=>{
        if(transaction.type === 'deposit'){
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        } else{
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }

        return acc
    },{
        deposits:0,
        withdraws:0,
        total: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong> -
                    {new Intl.NumberFormat('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}
