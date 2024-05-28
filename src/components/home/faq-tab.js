import FAQRow from "@/components/home/faq-row";

function FAQTab () {
  const headers = ["Question", "Answer", "Category", "Tag"];
  const faqs = [{question: "qfjenjenfjn", answer: "afjkelg;erbgjkebrgkjbergjk", category: "cwoefje", tag: "trkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"},{question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}, {question: "ffjenjenfjn", answer: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", tag: "rkbefef"}];
  return (
    <div className="pt-4 w-full">
      <div className="px-5 grid grid-cols-6 text-sm border-b-2 border-gray-200 pb-3 text-gray-500">
        {headers.map((header) => (
          <div className={`px-2 ${header === "Question" || header === "Answer" ? "col-span-2" : ""}`}>
            {header}
          </div> 
        ))}
      </div> 

      <div className="overflow-x-hidden overflow-y-auto" style={{ height: 'calc(100vh - 191px)' }}>
        {faqs.map((faq, index) => (
          <FAQRow 
            key={index} 
            question={faq.question} 
            answer={faq.answer} 
            category={faq.category} 
            tag={faq.tag} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default FAQTab;