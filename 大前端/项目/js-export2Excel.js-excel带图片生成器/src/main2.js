// pic
const conf = {
    pic: base.decode("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAE8ElEQVR4Xu2d0W4rIQxEs///0anUtyXSHo1mgJbMfWUx9hzbQDbNvd7v9/vVf8cocBXoMSx/AynQs3gW6GE8C7RAT1PgsHi6hxboYQocFk4rtEAPU+CwcFqhBXqYAoeF0wot0MMUOCycVmiBHqbAYeHYFXpd11JJ6PUt+UPzx2DIXjp41b8Pf933oX8tYPJHFYzsFaipAAEhADS/FdqWa6bofbqacNNbrusQVQjZHyvUfV61p9JN248fikjA2QGrAtHzNK7G4yYsrVegw5YxJmSBhr8Vqgqafl61RxX07yuUTp1jgGqFkOCr1yeganxkb/mhaLWgJBgJRPNpPG2f7BUoKETAaJwA0Hz3UDn9UNQKfb5n0pZBCXJ8hdKerB5KSPDZCVuggwLUwlRg1DIJAM0nf8n+cS23FWqmhJrhlGFqBlPLo/BU/8m/dHxk7+v2UKrYAh0UUgWhjKMKoPHZ9levT/G0QoePJtWELFDxfSkJRuOU0TTfHU+vT/aWV6jq0Op7ontomh2fan/6tUV1qEC93zApUHjdR3vs7IRV7Rdogd5zhi72aobR8+6hxZ1P/rnjtKeT/XiF0oLuuAvEne/6T/ML1PxOEO2RuzsQJcD0a4vqgPq8W2HufNVf9fntFao6nH5erTBXsLT/aXv2Hpp2SLVXoMMh1f1jJRVA+vkCLdB0Tv0pe3bLVSvEjV7dA+mUSvZovhoPrafam37KpVOk67AqCAEhezRfjYfWU+0V6KAACVyg8ALZzUAC8JGx8D6W7H09UBfYON8VPD0/DViNl/SNH4poQXU8DcSt4AJVCYb3uHRCFGiBSgpQApIxu+WqLUzdM9SKoGuTOk4CUvyz14tfWyggEoQyskBJwft4KxTep2pyvl7qJ2eU0PL66Q/n3YpKV/xqgVevt73lpvcUEjCdIFQxakKrZwpcf3WFFugzErcFL99DC7RAHxVoy518ysUeL35YTnsSVTz548537bstdvqhiAJMA3KBuPMpXrJfoPBZLyUMnSrV+QXalnvLgX9foZTR6jgdimic7qnUMlV/6XkXcPzaQg6nxwkYjRdomohpj4DReIGaANLTCRiNF+igQPpUSMBpjyGAqr+0npsQqn3Sx95DVYHIIRonAQqUFAKFC3T46M38e1VKaBpvhYJCar6rHUK1vxxo3EEx49VPgtL+0p5K/hEwGo9XaFogNeNJMLJHgqnjtCXF9XJfcM8WiOyrgpE9FRg9r/pH9mi8FRr+f2aOb7mUoW6LVCvOfZ78xQoSX06QvY8Emt1yC/T5WuMmSIGK38OlhFQPNWl7BVqgz12c9iTKSGo5qn21YtRDjLqnuf6o600/5Rao9/u3BWpeQ9QEJMFboeEf+SfB23IHBdQ9jgSm7/Co4yow1z7FN3v86/ZQaqkFar4NWX3KLVDoEW25s5uoZn96y9Xc+XyaEobspyuS7JE/s0+9BWqeqgkgbSnqfHq+QAv0+e1BuqW05VJNDjzSr8+05fWn1WsFJYQ67rZQWk9XpEBvCpDAdAhSOxKtV6DiPdit8Faom3LDfBeIO/94oGFeNWcqYF9bzPU7PaxAgYYF3W2uQHcTCK9foGFBd5sr0N0EwusXaFjQ3eYKdDeB8PoFGhZ0t7kC3U0gvH6BhgXdba5AdxMIr1+gYUF3myvQ3QTC6xdoWNDd5gp0N4Hw+j+nkRsOVLGNzQAAAABJRU5ErkJggg=="),
    picWidth: 40,
    picHeight: 60,
    excelWorkBookName: 'test'
};
// header, body
const tHeader = [
    'flower',
    'color',
    'pic'
];

const tBody = [
    {
        name: 'rose',
        color: 'red',
        pic: conf.pic
    },
    {
        name: 'rose2',
        color: 'red',
        pic: conf.pic
    },
    {
        name: 'rose3',
        color: 'red',
        pic: conf.pic
    }
];



let test = new export2Excel(tHeader, tBody, conf.excelWorkBookName, conf.picWidth, conf.picHeight);
// export2Excel(tHeader, tBody, 'test')
