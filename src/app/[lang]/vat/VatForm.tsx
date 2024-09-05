"use client"

// PIT = Personal Income Tax
// IRPF = Impuesto sobre la Renta de las Personas Físicas,

type GovPitChunk = {
    from: number
    to: number
    percentage: number
}

type PitChunk = {
    amount: number
    percentage: number
}

export const govPitChunks: GovPitChunk[] = [
    { from: 0, to: 12_450, percentage: 19 },
    { from: 12_450, to: 20_200, percentage: 24 },
    { from: 20_200, to: 35_200, percentage: 30 },
    { from: 35_200, to: 60_000, percentage: 37 },
    { from: 60_000, to: 300_000, percentage: 45 },
    { from: 300_000, to: Infinity, percentage: 47 },
] as const

const number_format = (
    number: number,
    decimals: number = 0,
    decimalSeparator: string = '.',
    thousandsSeparator: string = ',',
    prefix: string = '',
    suffix: string = '',
): string => {
    if (Infinity === number) return prefix + '∞' + suffix;

    // Handle the number of decimals
    const fixedNumber = number.toFixed(decimals);

    // Split the number into the integer and decimal parts
    const [integerPart, decimalPart] = fixedNumber.split('.');

    // Format the integer part with thousands separators
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    // Combine the integer and decimal parts
    return decimals > 0
        ? prefix + formattedInteger + decimalSeparator + decimalPart + suffix
        : prefix + formattedInteger + suffix;
}

const calculate = () => {
    const monthlyAmount = Number((document.getElementById('monthlyAmount') as HTMLInputElement).value)
    const yearlyAmount = Number(monthlyAmount * 12)
    const vatPercentage = Number((document.getElementById('vatPercentage') as HTMLInputElement).value)
    const vatAmount = Number(yearlyAmount * vatPercentage / 100)
    const afterPayingVatAmount = Number(yearlyAmount - vatAmount)

    let counted: number = 0
    let remaining: number = afterPayingVatAmount

    const calculatedChunks: PitChunk[] = govPitChunks.map((govPitChunk) => {
        const thisChunkLimit = Number(govPitChunk.to - govPitChunk.from)
        const thisChunk = remaining > 0 ? Math.min(thisChunkLimit, remaining) : 0

        counted += thisChunk
        remaining -= thisChunk

        const chunk: PitChunk = {
            amount: thisChunk,
            percentage: thisChunk * (govPitChunk.percentage / 100)
        }

        return chunk
    })

    const pitAmountToPay = calculatedChunks.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.percentage;
    }, 0);

    const pitPercentageToPay = pitAmountToPay / afterPayingVatAmount * 100

    const yearlyAmountForMe = afterPayingVatAmount - pitAmountToPay
    const monthlyAmountForMe = yearlyAmountForMe / 12

    document.getElementById('vat_percentage_label')!.innerText = '(' + vatPercentage + '%)'
    document.getElementById('pit_percentage_label')!.innerText = pitPercentageToPay.toFixed(1) + '%'
    document.getElementById('total_invoice_year')!.innerText = number_format(yearlyAmount, 2, '.', ' ', '', ' €')
    document.getElementById('total_invoice_month')!.innerText = number_format(monthlyAmount, 2, '.', ' ', '', ' €')
    document.getElementById('total_vat_year')!.innerText = number_format(vatAmount, 2, '.', ' ', '', ' €')
    document.getElementById('total_vat_month')!.innerText = number_format((vatAmount / 12), 2, '.', ' ', '', ' €')
    document.getElementById('total_pit_year')!.innerText = number_format(pitAmountToPay, 2, '.', ' ', '', ' €')
    document.getElementById('total_pit_month')!.innerText = number_format((pitAmountToPay / 12), 2, '.', ' ', '', ' €')
    document.getElementById('take_home_year')!.innerText = number_format(yearlyAmountForMe, 2, '.', ' ', '', ' €')
    document.getElementById('take_home_month')!.innerText = number_format(monthlyAmountForMe, 2, '.', ' ', '', ' €')
}

export default function VatForm() {
    return (
        <div className={"row"}>
            <div className={"col-4"}>
                <form>
                    <div className="form-group">
                        <label htmlFor="vat"><b>Gross monthly rate</b></label>
                        <input type="text" className="form-control" id="monthlyAmount" placeholder="Type here" onKeyUp={calculate}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="vat">VAT percentage</label>
                        <input type="text" className="form-control" id="vatPercentage" placeholder="21" onKeyUp={calculate}/>
                    </div>
                </form>
            </div>
            <div className={"col-4"}>

                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th>CONCEPT</th>
                        <th style={{ textAlign: 'right' }}>AMOUNT</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>TOTAL invoiced (12x)</th>
                        <td id={"total_invoice_year"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>... per month</th>
                        <td id={"total_invoice_month"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>TOTAL VAT <span id={"vat_percentage_label"}></span></th>
                        <td id={"total_vat_year"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>... per month (÷ 12)</th>
                        <td id={"total_vat_month"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>TOTAL PIT (<span id={"pit_percentage_label"}></span> IRPF)</th>
                        <td id={"total_pit_year"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>... per month (÷ 12)</th>
                        <td id={"total_pit_month"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>TOTAL Take-Home</th>
                        <td id={"take_home_year"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    <tr>
                        <th>... per month (÷ 12)</th>
                        <td id={"take_home_month"} style={{ textAlign: 'right' }}>...</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div className={"col-4"}>

                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th style={{textAlign: "right"}}>FROM</th>
                        <th style={{textAlign: "right"}}>TO</th>
                        <th style={{textAlign: "right"}}>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    {govPitChunks.map((chunk, index) => (
                        <tr key={`irpf_${index}`}>
                            <td style={{textAlign: "right"}}>{number_format(chunk.from, 0, '.', ' ', '', ' €')}</td>
                            <td style={{textAlign: "right"}}>{number_format(chunk.to, 0, '.', ' ', '', ' €')}</td>
                            <td style={{textAlign: "right"}}>{chunk.percentage}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
