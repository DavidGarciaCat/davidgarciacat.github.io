import VatForm from "@/app/[lang]/vat/VatForm";

export default async function VatPage() {
    return (
        <>
            <section className="resume-section">
                <div className={"row"} style={{width: '100%'}}>
                    <div className={"col-12"}>
                        <VatForm/>
                    </div>
                </div>
            </section>
        </>
    );
}
