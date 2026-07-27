
export default function Login() {
//   const handleSubmit = () => {
//     alert('Message sent!');
//   };

  return (
    <div class="grid grid-cols-5 min-h-screen w-full">
        <div class="col-span-2 bg-brand-primary p-6">
            <p>Left Side Content (1/3)</p>

        </div>
    
        <div class="col-span-3 bg-brand-secondary p-6 relative min-h-screen w-full overflow-hidden">
            <p>Right Side Content (2/3)</p>
            
            {/* thick */}
            <div class="relative flex items-center justify-center w-36 h-36 rounded-full border border-dashed border-white/60">
              <div class="w-20 h-20 rounded-full bg-[#529b8b]"></div>
            </div>

            {/* solid */}
            <div class="w-16 h-16 rounded-full bg-white"></div>

            {/* dashed */}
            <div class="w-16 h-16 rounded-full border border-dashed border-slate-700/60"></div>
        </div>
    </div>

  );
}
