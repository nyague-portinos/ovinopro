export default function SideNav(){
    return (
        <div className="w-[20%] bg-primary mt-20 fixed h-full">
            <ul className="flex flex-col items-center gap-2 justify-evenly h-auto mt-5">
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Establecimiento</li>
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Secciones</li>
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Hacienda</li>
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Mi Economia</li>
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Producciones</li>
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Mercados</li>
                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Clima</li>

                <li className="hover:text-primary font-medium text-2xl border border-secondary rounded-lg px-3 py-2 w-64 text-center text-secondary hover:translate-x-2 transition-all duration-150 cursor-pointer hover:bg-secondary">Reportes</li>

            </ul>
        </div>
    )
}