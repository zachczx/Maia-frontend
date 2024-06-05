import FAQRow from "@/components/home/faq-row";

function FAQTab () {
  const headers = ["ID", "Content", "Category", "Sub Category"];
  const faqs = [{id: "1", content: "afjkelg;erbgjkebrgkjbergjk", category: "cwoefje", sub_category: "trkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"},{id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}, {id: "1", content: "fjkelg;erbgjkebrgkjbergjk", category: "woefje", sub_category: "rkbefef"}];
  return (
    <div className="pt-4 w-full">
      <div className="px-5 grid grid-cols-7 text-sm border-b-2 border-gray-200 pb-3 text-gray-500">
        {headers.map((header) => (
          <div className={`px-2 ${header === "Content" ? "col-span-4" : ""}`}>
            {header}
          </div> 
        ))}
      </div> 

      <div className="overflow-x-hidden overflow-y-auto" style={{ height: 'calc(100vh - 191px)' }}>
        {faqs.map((faq, index) => (
          <FAQRow 
            key={index} 
            id={faq.id} 
            content={faq.content} 
            category={faq.category} 
            sub_category={faq.sub_category} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default FAQTab;