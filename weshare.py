# Liste over udgifter
persons = [
    [100, 200, 24],
    [0],
    [4, 8],
    [30, 68, 2, 2, 100]]

# Total for hver person og samlet
totals = []
total = 0

for i in range(len(persons)):
    t = 0
    for j in persons[i]:
        t += j
    totals.append(t)
    total += t

print(totals)
print(total)

# Hver persons pris
divtotal = total / len(persons)

# Hvor meget personen mangler at betale
dif = []
for i in totals:
    dif.append(i - divtotal)

print("dif" + str(dif))

# Liste over betalinger
betalinger = []

# Udregn betalinger
for i in range(len(dif)):
    # Hvis man har betalt nok spring over
    if dif[i] >= 0:
        betalinger.append([0])
        continue

    # Lav liste over dem man skal overføre til 
    b = []
    # Loop igennem og find dem de skylder til
    for j in range(len(dif)):
        if dif[j] > 0:
            # Overfør det de mangler eller det de har råd til
            n = min(dif[j], dif[i] * -1)
            # Skriv overførslen ned
            b.append({j : n})

            dif[j] -= n
            dif[i] += n

            # Hvis nok er overført gå til næste person
            if dif[i] == 0:
                break
            # Ellers skal man også betale til næste

    betalinger.append(b)

print(betalinger)

