 pdb = power distribution board , busbar is a metal bar for high current distribution , with heat distribution and less V drop , 

current supplied = 
	1. battery 
		1. capacity ( in Amp hr ) x Crating  = max safe continuous current , 
	2. motor = 
		1. properller
		2. throttle
		3. voltage of battery ( p = Vi) = V drop , more I for same P , so more heat    ! hence full voltage for less heat , smooth Power draw 
		4. current = P ( watts )/ nefficiency * V 
		5. hover current = Wt / no. of motor  ==> gives THRUST ==> MATCH TO load table for expected current draw 
			1. depends on wind , density , battery voltage 

bec = bec - battery elimintator circuit - high voltage from main battery to step down to stable voltage 5 or 12v , 
	bec types -> 
		linear and switching 
			linear simple , less noise , step down Voltage
			overheat easily 
			heat with extra energy 
			for sensitive noise 
			inefficient at large multirotors
		switching -
			high frequency swithcing mechanism to turn power on and off rapidly 
			efficient 
			less heat generate 
			introduce noise a lot 
			interfer with gps and video system unless proper filtering done  
				tackle - add capacitor - decoupling capactiro - smooth voltage spike 
				twisted pair of wire for power and signal line to stop em interference
				ferrite ring / beads on cable 
				lc filter for clean power 
		current rating - FOR TRANSMITTER 
		UBEC -> UNIVERSAL BATTERY ELIMIATOR FOR EXTENAL MODULE FOR SENSITIVE ELECTRONICAL 
	
DIAPHRAGM PUMP - CHAMBER WITH DIAPHRAGM , 
		PUSH DRAW LIQUID 
		SEALED FROM FLUID 
		SELF PRIMING 
		pump can create enough suction to draw air out of the inlet line and lift fluid up from a tank or reservoir without you having to manually fill the pump or the lines with liquid first.
		
		
Pressure Gauge
		PRESSURE OF THE FLUID IN SPRAY SYSTEM 
		SO NOZZLE SPRAY HAS CORRECT DROPLET SIZE , CONSISTENT APPLICATION RATE 
		hdpe - high densitty polythelene 
flow sensor - 
	internal turbine to generate data pulses , freq == flwo rate , 
		flight controller integrate for spraying , less waste and correct dosage 
		10mA less current draw 
		5 to 12v taken 



motor speed , air resistance vs properller to properotionality curve 
	push higher thrust level , properller is less efficient 
  As the propeller becomes less efficient at higher thrust, 
  the amount of current required to produce each additional unit of thrust actually increases more rapidly
  . This causes the curve to bend upwards, toward the y-axis, rather than toward the x-axis.
	 the power consumption increases

























