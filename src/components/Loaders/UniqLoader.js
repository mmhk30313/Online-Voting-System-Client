export default function UniqLoader({color}) {
    return <div className="w-full flex flex-row gap-2 animate-pulse">
        <div className="flex flex-col w-full grow space-y-2">
            <p className={`text-slate-200 p-2 text-[8px] bg-${color || "slate"}-200 rounded-lg`}>
                
            </p>
        </div>
    </div>
}
